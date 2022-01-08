import { useLayoutEffect, useRef } from 'react';

import './PlayPage.scss';
import { PlayMenu } from './PlayMenu';
import { HexMap, IPosition } from './HexMap';

export const PlayPage: React.FC = () => {
  // const [hexMap, setHexMap] = useState<HexMap>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    console.log('effect');
    const { current: canvas } = canvasRef;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    const map = new HexMap(ctx);

    // console.log(map);
    map.init();
    map.generateMap(3000);
    map.drawMap();

    window.onwheel = ({ deltaY }) => {
      // console.log('scroll');
      if (deltaY > 0) {
        map.scale(-0.25);
      } else {
        map.scale(0.25);
      }
    };

    window.onclick = ({ clientX, clientY }) => {
      // console.log(e);

      map.click({ x: clientX, y: clientY });
    };

    window.ondblclick = ({ clientX, clientY }) => {
      map.zoom({ x: clientX, y: clientY }, 0.5);
    };

    window.onmousedown = e => {
      map.dragStart({ x: e.clientX, y: e.clientY });
    };

    window.onmousemove = e => {
      map.dragMove({ x: e.clientX, y: e.clientY });
    };

    window.onmouseup = e => {
      map.dragEnd({ x: e.clientX, y: e.clientY });
    };

    let lastTouch: IPosition;

    window.ontouchstart = ({ touches }) => {
      map.dragStart({ x: touches[0].clientX, y: touches[0].clientY });
    };

    window.ontouchmove = ({ touches }) => {
      lastTouch = { x: touches[0].clientX, y: touches[0].clientY };
      map.dragMove(lastTouch);
    };

    window.ontouchend = () => {
      map.dragEnd(lastTouch);
    };

    window.onkeydown = ({ key }) => {
      switch (key) {
        case 'ArrowRight':
          map.move(222, 0);
          break;
        case 'ArrowLeft':
          map.move(-222, 0);
          break;
        case 'ArrowUp':
          map.move(0, -222);
          break;
        case 'ArrowDown':
          map.move(0, 222);
          break;
      }
    };
  });

  return (
    <section className="play-page">
      <canvas ref={canvasRef} />
      <PlayMenu />
      <main></main>
    </section>
  );
};
