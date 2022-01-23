import React, { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAxiosInstance } from '../../shared/ts/axiosInstance';
import { GetResponseHexagonInfo, GetResponseAllHexagonOwned } from '../../shared/ts/types';

import './PlayPage.scss';
import { PlayMenu } from './PlayMenu';
import { PlayPagePopup } from './PlayPagePopup';
import { HexagonMap } from './hexagonMap/HexagonMap';
import { EventManager } from './hexagonMap/EventManager';

export const PlayPage: React.FC = () => {
  const navigate = useNavigate();
  // const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [infoPopup, setInfoPopup] = useState<JSX.Element | null>(null);
  const playPageRef = useRef<HTMLElement>(null);
  const canvasHexagonRef = useRef<HTMLCanvasElement>(null);
  const canvasLineRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const { current: playPage } = playPageRef;
    const { current: canvasHexagon } = canvasHexagonRef;
    const { current: canvasLine } = canvasLineRef;

    if (!canvasHexagon || !canvasLine || !playPage) {
      return;
    }

    const axiosInstance = getAxiosInstance(navigate);
    // HACK: test
    const map = new HexagonMap(canvasHexagon, canvasLine, (hexagonId: number) => {
      axiosInstance({
        requestConfig: {
          method: 'get',
          url: `/hexagon/${hexagonId}`,
        },
        onResponse: (response: GetResponseHexagonInfo) => {
          console.log(response);
          setInfoPopup(<PlayPagePopup hexagonId={hexagonId} hexagonInfo={response.data} closePopupCallback={() => setInfoPopup(null)} />);
        },
      });
    });
    const eventManager = new EventManager(playPage, map);

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
  });

  return (
    <section className="play-page" ref={playPageRef}>
      <canvas className="play-page-canvas-hexagon" ref={canvasHexagonRef} />
      <canvas className="play-page-canvas-line" ref={canvasLineRef} />
      {/* {isVisiblePopup &&
        <PlayPagePopup
          closePopupCallback={() => {
            setIsVisiblePopup(false);
          }}
        />
      } */
        infoPopup
      }
      <PlayMenu />
    </section>
  );
};
