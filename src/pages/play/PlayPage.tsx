import { useLayoutEffect, useRef } from 'react';

import './PlayPage.scss';
import { PlayMenu } from './PlayMenu';
import { HexMap } from './hexMap/HexMap';
import { EventManager } from './hexMap/EventManager';
import { getAxiosInstance } from '../../shared/ts/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { GetResponseAllHexagonOwned } from '../../shared/ts/types';

export const PlayPage: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    console.log('layout effect');
    const { current: canvas } = canvasRef;

    if (!canvas) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    const axiosInstance = getAxiosInstance(navigate);
    // HACK: test
    const map = new HexMap(canvas, (hexagonId: number) => {
      axiosInstance({
        requestConfig: {
          method: 'get',
          url: `/hexagon/${hexagonId}`,
        },
        onResponse: (response: GetResponseAllHexagonOwned) => console.log(response),
      });
    });
    const eventManager = new EventManager(canvas, map);

    axiosInstance({
      requestConfig: {
        method: 'get',
        url: '/hexagon/all/owned',
      },
      onResponse: (response: GetResponseAllHexagonOwned) => map.setAllOwnedHexagons(response.data),
    });

    map.run();
    eventManager.setEvents();
  }, [navigate]);

  return (
    <section className="play-page">
      <canvas ref={canvasRef} />
      <PlayMenu />
      <main></main>
    </section>
  );
};
