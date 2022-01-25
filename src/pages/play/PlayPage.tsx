import React, { useLayoutEffect, useRef, useState } from 'react';
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
  const [hexagonId, setHexagonId] = useState<number>();
  const canvasHexagonRef = useRef<HTMLCanvasElement>(null);
  const canvasLineRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const { current: canvasHexagon } = canvasHexagonRef;
    const { current: canvasLine } = canvasLineRef;

    if (!canvasHexagon || !canvasLine) {
      return;
    }

    const axiosInstance = getAxiosInstance(navigate);
    // HACK: test
    const map = new HexagonMap(
      canvasHexagon,
      canvasLine,
      (hexagonId: number) => {
        setIsVisiblePopup(true);
        setHexagonId(hexagonId);
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

    return () => {
      map.stop();
      eventManager.unsetEvents();
    };
  }, [navigate]);

  return (
    <section className="play-page">
      <canvas className="play-page-canvas-hexagon" ref={canvasHexagonRef} />
      <canvas className="play-page-canvas-line" ref={canvasLineRef} />
      <PlayMenu />
      {isVisiblePopup && (
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
