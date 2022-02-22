import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IGetResponseHexagonInfo, ISocketMapMessage, ISocketNewHexagonMessage } from '../../shared/ts/interfaces';
import { prepareRequest, onSocketEvent, removeSocketEventListenerAll } from '../../shared/ts/clientCommunication';
import { AxiosInstanceFunction, GetResponseAllHexagonOwned, GetResponseHexagonInfo } from '../../shared/ts/types';
import { checkIsAuth } from '../../shared/ts/helperFunctions';

import { addAlert, setIsShownAttackAlert } from '../../store/alertSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

import './PlayPage.scss';
import { PlayMenu } from './PlayMenu';
import { PlayPopup } from './playPopup/PlayPopup';
import { EventManager } from './hexagonMap/EventManager';
import { HexagonMap } from './hexagonMap/HexagonMap';
import { Loader } from '../../components/loader/Loader';

const prepareAttackRequest = (
  request: AxiosInstanceFunction,
  attackerId: number,
  defenderId: number,
): ((response: GetResponseHexagonInfo) => void) => {
  return (response: GetResponseHexagonInfo) => {
    if (!response.data.canAttack) {
      return;
    }

    request({
      requestConfig: {
        method: 'post',
        url: '/hexagon/attack',
        data: { from: attackerId, to: defenderId },
      },
    });
  };
};

export const PlayPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const isSocketConnected = useAppSelector((state) => state.socket.isSocketConnected);
  const { userId } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const canvasHexagonRef = useRef<HTMLCanvasElement>(null);
  const canvasLineRef = useRef<HTMLCanvasElement>(null);
  const playPageRef = useRef<HTMLElement>(null);

  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [isVisibleLoader, setIsVisibleLoader] = useState(true);
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

  // PlayPage init useEffect
  useEffect(() => {
    const isAuth = checkIsAuth(dispatch, navigate);

    if (!isAuth) {
      return;
    }

    console.log('PlayPage init effect');
    const { current: playPage } = playPageRef;
    const { current: canvasHexagon } = canvasHexagonRef;
    const { current: canvasLine } = canvasLineRef;

    if (!canvasHexagon || !canvasLine || !playPage) {
      return;
    }

    const request = prepareRequest(navigate, dispatch);

    const clickOnHexagonCallback = (hexagonId: number) => {
      let getResponseHexagonInfoCallback = (response: GetResponseHexagonInfo): void => setHexagonInfo(response.data);

      if (!eventManager.attackerId) {
        setHexagonInfo(null);
        setHexagonId(hexagonId);
        setIsVisiblePopup(true);
      } else {
        getResponseHexagonInfoCallback = prepareAttackRequest(request, eventManager.attackerId, hexagonId);

        eventManager.attackerId = null;
      }

      request({
        requestConfig: {
          method: 'get',
          url: `/hexagon/${hexagonId}`,
        },
        onResponse: getResponseHexagonInfoCallback,
      });
    };

    const clickOutsideHexagonCallback = () => {
      setIsVisiblePopup(false);
      eventManager.attackerId = null;
    };

    const map = new HexagonMap(canvasHexagon, canvasLine, clickOnHexagonCallback, clickOutsideHexagonCallback);
    const eventManager = new EventManager(canvasLine, map);

    let loaderTimer = 0;

    // I set onwheel through ref because in this situation: "<section onWheel={e => e.preventDefault()}>" event listener is passive.
    // That means i can't block default browser zoom for my elements.
    playPage.onwheel = (e) => e.preventDefault();

    request({
      requestConfig: {
        method: 'get',
        url: '/hexagon/all/owned',
      },
      onResponse: (response: GetResponseAllHexagonOwned) => {
        map.setAllOwnedHexagons(response.data);

        loaderTimer = window.setTimeout(() => {
          setIsVisibleLoader(false);
        }, 200);
      },
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

      clearTimeout(loaderTimer);
    };
  }, [dispatch, navigate]);

  // PlayPage socket connection useEffect
  useEffect(() => {
    if (!map || !eventManager || !isSocketConnected) {
      return;
    }

    onSocketEvent({
      event: 'attack',
      callback: ({ to, type, message }) => {
        if (to === userId) {
          dispatch(addAlert({ type, heading: message }));
        }
      },
    });

    onSocketEvent({
      event: 'map',
      callback: (eventMessage: ISocketMapMessage) => map.updateHexagonAttack(eventMessage),
    });

    onSocketEvent({
      event: 'newHexagon',
      callback: (eventMessage: ISocketNewHexagonMessage) => map.addOwnedHexagon(eventMessage),
    });

    return () => {
      removeSocketEventListenerAll('map');
      removeSocketEventListenerAll('newHexagon');
      removeSocketEventListenerAll('attack');
    };
  }, [dispatch, eventManager, isSocketConnected, map, navigate, userId]);

  return (
    <section className="play-page" ref={playPageRef}>
      <canvas className="play-page-canvas-hexagon" ref={canvasHexagonRef} />
      <canvas className="play-page-canvas-line" ref={canvasLineRef} />

      {isVisibleLoader && (
        <div className="play-page-loader-wrapper">
          <Loader />
        </div>
      )}

      <PlayMenu showOwnedTerritoryCallback={map?.showOwnedHexagonAll.bind(map)} />

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
