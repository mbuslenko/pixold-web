import { useLayoutEffect, useRef } from 'react';

import './PlayPage.scss';
import { PlayMenu } from './PlayMenu';
import { HexMap } from './hexMap/HexMap';
import { EventManager } from './hexMap/EventManager';

export const PlayPage: React.FC = () => {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const { current: canvas } = canvasRef;
    const { current: canvasWrapper } = canvasWrapperRef;

    if (!canvas || !canvasWrapper) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';
    canvas.style.transformOrigin = '0 0';

    const map = new HexMap(canvas);
    const eventManager = new EventManager(canvasWrapper, map);

    map.run();
    eventManager.setWindowEvents();
  }, []);

  return (
    <section className="play-page">
      <div ref={canvasWrapperRef}>
        <canvas ref={canvasRef} />
      </div>
      <PlayMenu />
      <main></main>
    </section>
  );
};
