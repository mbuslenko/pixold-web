import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAxiosInstance } from '../../shared/ts/axiosInstance';
import { GetResponseAllHexagonOwned } from '../../shared/ts/types';

import './PlayPage.scss';
import { PlayMenu } from './PlayMenu';
import { PlayPagePopup } from './PlayPagePopup';
import { HexagonMap } from './hexagonMap/HexagonMap';
import { EventManager } from './hexagonMap/EventManager';

export const PlayPage: React.FC = () => {
  const navigate = useNavigate();
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [hexagonId, setHexagonId] = useState<number | null>(null);
  const playPageRef = useRef<HTMLElement>(null);
  const canvasHexagonRef = useRef<HTMLCanvasElement>(null);
  const canvasLineRef = useRef<HTMLCanvasElement>(null);
  const [map, setMap] = useState<HexagonMap>();

  useLayoutEffect(() => {
    const { current: playPage } = playPageRef;
    const { current: canvasHexagon } = canvasHexagonRef;
    const { current: canvasLine } = canvasLineRef;

    if (!canvasHexagon || !canvasLine || !playPage) {
      return;
    }

    // I set onwheel through ref because in this situation: "<section onWheel={e => e.preventDefault()}>" event listener is passive.
    // That means i can't block default browser zoom for my elements.
    playPage.onwheel = e => e.preventDefault();

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
    const eventManager = new EventManager(canvasLine, map);

    axiosInstance({
      requestConfig: {
        method: 'get',
        url: '/hexagon/all/owned',
      },
      onResponse: (response: GetResponseAllHexagonOwned) => map.setAllOwnedHexagons(response.data),
    });

    map.run();
    eventManager.setEvents();

    setMap(map);

    return () => {
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
        <PlayPagePopup
          hexagonId={hexagonId}
          closePopupCallback={() => {
            setIsVisiblePopup(false);
          }}
        />
      )}
    </section>
  );
};
