import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GetResponseAllHexagonOwned } from '../../shared/ts/types';

import './PlayPage.scss';
import { PlayMenu } from './PlayMenu';
import { PlayPopup } from './playPopup/PlayPopup';
import { HexagonMap } from './hexagonMap/HexagonMap';
import { EventManager } from './hexagonMap/EventManager';
import { IPlayPageProps } from './interfaces';
import { client } from '../../shared/ts/ClientCommunication';
import { ISocketMapMessage, ISocketNewHexagonMessage } from '../../shared/ts/interfaces'

export const PlayPage: React.FC<IPlayPageProps> = ({ showAlertsCallback }) => {
  const navigate = useNavigate();

  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [hexagonId, setHexagonId] = useState<number | null>(null);
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

    client.prepareRequest(navigate)({
      requestConfig: {
        method: 'get',
        url: '/hexagon/all/owned',
      },
      onResponse: (response: GetResponseAllHexagonOwned) => map.setAllOwnedHexagons(response.data),
    });

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
      }
    });

    showAlertsCallback(true);

    map.run();
    eventManager.setEvents();

    setMap(map);
    setEventManager(eventManager)

    return () => {
      client.removeEventListenerAll('map');
      client.removeEventListenerAll('newHexagon');

      showAlertsCallback(false);
      map.stop();
      eventManager.unsetEvents();
    };
  }, [navigate, showAlertsCallback]);

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
          // TODO: finish attack
          drawAttackLineCallback={() => {
            eventManager?.drawAttackLineFromSelectedHexagon();
          }}
          stopAttackLineCallback={() => {
            eventManager?.stopAttackLine();
          }}
        />
      )}
    </section>
  );
};
