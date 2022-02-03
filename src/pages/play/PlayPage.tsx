import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetResponseAllHexagonOwned, GetResponseHexagonInfo } from '../../shared/ts/types';

import './PlayPage.scss';
import { PlayMenu } from './PlayMenu';
import { PlayPopup } from './playPopup/PlayPopup';
import { HexagonMap } from './hexagonMap/HexagonMap';
import { EventManager } from './hexagonMap/EventManager';
import { IPlayPageProps } from './interfaces';
import { client } from '../../shared/ts/ClientCommunication';
import { IGetResponseHexagonInfo, ISocketMapMessage, ISocketNewHexagonMessage } from '../../shared/ts/interfaces';

export const PlayPage: React.FC<IPlayPageProps> = ({ showAlertsCallback, isConnectedSocket }) => {
  const navigate = useNavigate();

  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [hexagonAttackerId, setHexagonAttackerId] = useState<number | null>(null);
  const [hexagonId, setHexagonId] = useState<number | null>(null);
  const [hexagonInfo, setHexagonInfo] = useState<IGetResponseHexagonInfo | null>(null);

  const [map, setMap] = useState<HexagonMap>();
  const [eventManager, setEventManager] = useState<EventManager>();

  const playPageRef = useRef<HTMLElement>(null);
  const canvasHexagonRef = useRef<HTMLCanvasElement>(null);
  const canvasLineRef = useRef<HTMLCanvasElement>(null);

  if (!localStorage.getItem('accessToken')) {
    navigate('/auth', { replace: true });
  }

  useEffect(() => {
    const { current: playPage } = playPageRef;
    const { current: canvasHexagon } = canvasHexagonRef;
    const { current: canvasLine } = canvasLineRef;

    if (!canvasHexagon || !canvasLine || !playPage) {
      return;
    }

    // I set onwheel through ref because in this situation: "<section onWheel={e => e.preventDefault()}>" event listener is passive.
    // That means i can't block default browser zoom for my elements.
    playPage.onwheel = (e) => e.preventDefault();

    // HACK: test
    const map = new HexagonMap(canvasHexagon, canvasLine, () => {
      setIsVisiblePopup(false);
      eventManager.drawAttackLine = false;
    });
    // TODO: make eventManager inside of map
    const eventManager = new EventManager(canvasLine, map);

    client.prepareRequest(navigate)({
      requestConfig: {
        method: 'get',
        url: '/hexagon/all/owned',
      },
      // TODO: make adjustments for backend starting hexagon id from 1
      onResponse: (response: GetResponseAllHexagonOwned) => map.setAllOwnedHexagons(response.data),
    });

    showAlertsCallback(true);

    map.run();
    eventManager.setEvents();

    setMap(map);
    setEventManager(eventManager);

    return () => {
      client.removeEventListenerAll('map');
      client.removeEventListenerAll('newHexagon');

      showAlertsCallback(false);
      map.stop();
      eventManager.unsetEvents();
    };
  }, [navigate, showAlertsCallback]);

  useEffect(() => {
    if (!map) {
      return;
    }

    client.onEvent({
      event: 'map',
      callback: (eventMessage: ISocketMapMessage) => {
        map.updateHexagonAttack(eventMessage);
      },
    });

    client.onEvent({
      event: 'newHexagon',
      callback: (eventMessage: ISocketNewHexagonMessage) => {
        map.addOwnedHexagon(eventMessage);
      },
    });
  }, [isConnectedSocket, map]);

  useEffect(() => {
    if (!map || !eventManager) {
      return;
    }

    map.clickOnHexagonCallback = (hexagonId: number) => {
      console.log(eventManager.drawAttackLine);
      if (eventManager.drawAttackLine) {
        client.prepareRequest(navigate)({
          requestConfig: {
            method: 'get',
            url: `/hexagon/${hexagonId}`,
          },
          onResponse: (response: GetResponseHexagonInfo): void => {
            if (response.data.canAttack && hexagonAttackerId && hexagonId) {
              const attackData = { from: hexagonAttackerId, to: hexagonId };

              console.log(attackData);
              client.prepareRequest(navigate)({
                requestConfig: {
                  method: 'get',
                  url: '/hexagon/attack',
                  data: attackData,
                },
              });
            }
          },
        });

        // TODO: switching between hexagons will still draw line
        eventManager.drawAttackLine = false;

        return;
      }

      setHexagonInfo(null);
      setHexagonId(hexagonId);
      setIsVisiblePopup(true);

      client.prepareRequest(navigate)({
        requestConfig: {
          method: 'get',
          url: `/hexagon/${hexagonId}`,
        },
        onResponse: (response: GetResponseHexagonInfo): void => {
          console.log(response.data);
          setHexagonInfo(response.data);
        },
      });
    };
  }, [eventManager, hexagonAttackerId, hexagonId, map, navigate]);

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
          closePopupCallback={() => {
            setIsVisiblePopup(false);
          }}
          // TODO: finish attack
          drawAttackLineCallback={(hexagonId: number) => {
            if (eventManager) {
              setHexagonAttackerId(hexagonId);
              eventManager.drawAttackLine = true;
              setIsVisiblePopup(false);
            }
          }}
        />
      )}
    </section>
  );
};
