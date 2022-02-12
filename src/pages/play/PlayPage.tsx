import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './PlayPage.scss';
import { PlayMenu } from './PlayMenu';
import { PlayPopup } from './playPopup/PlayPopup';
import { IGetResponseHexagonInfo, ISocketMapMessage, ISocketNewHexagonMessage } from '../../shared/ts/interfaces';
import { prepareRequest, onSocketEvent, removeSocketEventListenerAll } from '../../shared/ts/clientCommunication';
import { GetResponseAllHexagonOwned, GetResponseHexagonInfo } from '../../shared/ts/types';
import { EventManager } from './hexagonMap/EventManager';
import { HexagonMap } from './hexagonMap/HexagonMap';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert, setIsShownAttackAlert } from '../../store/alertSlice';
import { RootState } from '../../store/types';
import { checkAuth } from '../../shared/ts/helperFunctions';

export const PlayPage: React.FC = () => {
  console.log('PlayPage render');
  const dispatch = useDispatch();

  const isSocketConnected = useSelector((state: RootState) => state.socket.isSocketConnected);

  const navigate = useNavigate();

  const canvasHexagonRef = useRef<HTMLCanvasElement>(null);
  const canvasLineRef = useRef<HTMLCanvasElement>(null);
  const playPageRef = useRef<HTMLElement>(null);

  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [hexagonId, setHexagonId] = useState<number | null>(null);
  const [hexagonInfo, setHexagonInfo] = useState<IGetResponseHexagonInfo | null>(null);
  const [map, setMap] = useState<HexagonMap>();
  const [eventManager, setEventManager] = useState<EventManager>();

  const drawAttackLineCallback = (hexagonId: number) => {
    if (eventManager) {
      eventManager.attackerId = hexagonId;
      setIsVisiblePopup(false);
    }
  };

  checkAuth(navigate);

  useEffect(() => {
    console.log('PlayPage init effect');
    const { current: playPage } = playPageRef;
    const { current: canvasHexagon } = canvasHexagonRef;
    const { current: canvasLine } = canvasLineRef;

    if (!canvasHexagon || !canvasLine || !playPage) {
      return;
    }

    const request = prepareRequest(navigate, dispatch);
    const clickOnHexagonCallback = (hexagonId: number) => {
      if (eventManager.attackerId) {
        request({
          requestConfig: {
            method: 'get',
            url: `/hexagon/${hexagonId}`,
          },
          onResponse: (response: GetResponseHexagonInfo): void => {
            console.log([response.data.canAttack, eventManager.attackerId, hexagonId]);
            if (response.data.canAttack && eventManager.attackerId && hexagonId) {
              const attackData = { from: eventManager.attackerId, to: hexagonId };

              eventManager.attackerId = null;

              request({
                requestConfig: {
                  method: 'post',
                  url: '/hexagon/attack',
                  data: attackData,
                },
              });
            }
          },
        });

        // eventManager.attackerId = null;

        return;
      }

      setHexagonInfo(null);
      setHexagonId(hexagonId);
      setIsVisiblePopup(true);

      request({
        requestConfig: {
          method: 'get',
          url: `/hexagon/${hexagonId}`,
        },
        onResponse: (response: GetResponseHexagonInfo): void => setHexagonInfo(response.data),
      });
    };

    const clickOutsideHexagonCallback = () => {
      setIsVisiblePopup(false);
      eventManager.attackerId = null;
    };

    const map = new HexagonMap(canvasHexagon, canvasLine, clickOnHexagonCallback, clickOutsideHexagonCallback);
    // TODO: make eventManager inside of map
    const eventManager = new EventManager(canvasLine, map);

    // I set onwheel through ref because in this situation: "<section onWheel={e => e.preventDefault()}>" event listener is passive.
    // That means i can't block default browser zoom for my elements.
    playPage.onwheel = (e) => e.preventDefault();

    request({
      requestConfig: {
        method: 'get',
        url: '/hexagon/all/owned',
      },
      onResponse: (response: GetResponseAllHexagonOwned) => map.setAllOwnedHexagons(response.data),
    });

    map.run();
    eventManager.setEvents();

    setMap(map);
    setEventManager(eventManager);

    dispatch(setIsShownAttackAlert(true));

    return () => {
      dispatch(setIsShownAttackAlert(false));

      map.stop();
      eventManager.unsetEvents();
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!map || !eventManager || !isSocketConnected) {
      return;
    }

    onSocketEvent({
      event: 'attack',
      callback: ({ to, type, message }) => {
        if (to === localStorage.getItem('userId')) {
          dispatch(addAlert({ type, heading: message }));
        }
      },
    });

    onSocketEvent({
      event: 'map',
      callback: (eventMessage: ISocketMapMessage) => {
        map.updateHexagonAttack(eventMessage);
      },
    });

    onSocketEvent({
      event: 'newHexagon',
      callback: (eventMessage: ISocketNewHexagonMessage) => {
        map.addOwnedHexagon(eventMessage);
      },
    });

    return () => {
      removeSocketEventListenerAll('map');
      removeSocketEventListenerAll('newHexagon');
      removeSocketEventListenerAll('attack');
    };
  }, [dispatch, eventManager, isSocketConnected, map, navigate]);

  return (
    <section className="play-page" ref={playPageRef}>
      <canvas className="play-page-canvas-hexagon" ref={canvasHexagonRef} />
      <canvas className="play-page-canvas-line" ref={canvasLineRef} />
      <PlayMenu showMyTerritoryCallback={map?.showOwnedHexagonAll.bind(map)} />
      {isVisiblePopup && hexagonId !== null && (
        <PlayPopup
          hexagonId={hexagonId}
          hexagonInfo={hexagonInfo}
          setHexagonInfo={setHexagonInfo}
          closePopupCallback={() => setIsVisiblePopup(false)}
          drawAttackLineCallback={drawAttackLineCallback}
        />
      )}
    </section>
  );
};
