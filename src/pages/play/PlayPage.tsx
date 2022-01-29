import { io } from 'socket.io-client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAxiosInstance } from '../../shared/ts/axiosInstance';
import { GetResponseAllHexagonOwned } from '../../shared/ts/types';
import { ISocketAttackMessage } from '../../shared/ts/interfaces';

import { Alert } from '../../components/alert/Alert';

import './PlayPage.scss';
import { PlayMenu } from './PlayMenu';
import { PlayPopup } from './playPopup/PlayPopup';
import { HexagonMap } from './hexagonMap/HexagonMap';
import { EventManager } from './hexagonMap/EventManager';
import { PlayShowAlertCallback } from './types';

export const PlayPage: React.FC = () => {
  const navigate = useNavigate();

  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [hexagonId, setHexagonId] = useState<number | null>(null);
  const [map, setMap] = useState<HexagonMap>();
  const [alertProps, setAlertProps] = useState<PlayShowAlertCallback>(null);

  const playPageRef = useRef<HTMLElement>(null);
  const canvasHexagonRef = useRef<HTMLCanvasElement>(null);
  const canvasLineRef = useRef<HTMLCanvasElement>(null);

  if (!localStorage.getItem('accessToken')) {
    navigate('/auth', { replace: true });
  }

  useLayoutEffect(() => {
    const { current: playPage } = playPageRef;
    const { current: canvasHexagon } = canvasHexagonRef;
    const { current: canvasLine } = canvasLineRef;

    if (!canvasHexagon || !canvasLine || !playPage) {
      return;
    }

    // I set onwheel through ref because in this situation: "<section onWheel={e => e.preventDefault()}>" event listener is passive.
    // That means i can't block default browser zoom for my elements.
    playPage.onwheel = (e) => e.preventDefault();

    const axiosInstance = getAxiosInstance(navigate);
    // HACK: test
    const map = new HexagonMap(
      canvasHexagon,
      canvasLine,
      (hexagonId: number) => {
        setHexagonId(hexagonId);
        setIsVisiblePopup(true);
      },
      () => setIsVisiblePopup(false),
    );
    // TODO: make eventManager inside of map
    const eventManager = new EventManager(canvasLine, map);

    axiosInstance({
      requestConfig: {
        method: 'get',
        url: '/hexagon/all/owned',
      },
      onResponse: (response: GetResponseAllHexagonOwned) => map.setAllOwnedHexagons(response.data),
    });

    const socket = io(process.env.REACT_APP_SOCKET_URL as string);

    socket.on('attack', (payload: ISocketAttackMessage) => {
      console.log('socket attack');
      const { to, type, message } = payload;

      if (to === localStorage.getItem('userId')) {
        console.log(['Sir/Madam, you are under attacked', type, message]);
        // HACK: test
        setAlertProps({
          type,
          heading: message,
        });
      }
      // map;
    });

    socket.on('info', (payload) => {
      console.log(payload);
    });

    map.run();
    eventManager.setEvents();

    setMap(map);

    return () => {
      socket.close();
      map.stop();
      eventManager.unsetEvents();
    };
  }, [navigate]);

  return (
    <section className="play-page" ref={playPageRef}>
      <canvas className="play-page-canvas-hexagon" ref={canvasHexagonRef} />
      <canvas className="play-page-canvas-line" ref={canvasLineRef} />
      <PlayMenu showMyTerritoryCallback={map?.showOwnedHexagonAll.bind(map)} />
      {isVisiblePopup && hexagonId !== null && (
        <PlayPopup
          hexagonId={hexagonId}
          closePopupCallback={() => {
            setIsVisiblePopup(false);
          }}
          setAlertPropsCallback={setAlertProps}
        />
      )}
      {alertProps && <Alert {...alertProps} closeAlertCallback={() => setAlertProps(null)} />}
    </section>
  );
};
