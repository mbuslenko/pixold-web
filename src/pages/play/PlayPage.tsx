import { useLayoutEffect, useRef } from 'react';

import './PlayPage.scss';
import { PlayMenu } from './PlayMenu';
import { HexMap } from './hexMap/HexMap';
import { EventManager } from './hexMap/EventManager';

export const PlayPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const { current: canvas } = canvasRef;

    if (!canvas) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    const map = new HexMap(canvas);
    const eventManager = new EventManager(canvas, map);

    map.run();
    eventManager.setEvents();
  }, []);

  return (
    <section className="play-page">
      <canvas ref={canvasRef} />
      <PlayMenu />
      <main></main>
    </section>
  );
};
