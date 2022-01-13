import { useLayoutEffect, useRef } from 'react';

import './PlayPage.scss';
import { PlayMenu } from './PlayMenu';
import { HexMap } from './hexMap/HexMap';
import { Vector } from './hexMap/Vector';

export const PlayPage: React.FC = () => {
  // const [hexMap, setHexMap] = useState<HexMap>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let ctx;

  useLayoutEffect(() => {
    console.log('effect');
    const { current: canvas } = canvasRef;

    if (!canvas) {
      return;
    }

    ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    const map = new HexMap(ctx);

    map.run();
    // map.drawMap();

    window.onwheel = ({ deltaY }) => {
      if (deltaY > 0) {
        map.scale(-0.25);
      } else {
        map.scale(0.25);
      }
    };

    window.onclick = (e) => {
      // map.click(Vector.CreateFromMouseEvent(e));
    };

    window.ondblclick = (e) => {
      map.zoom(0.5, Vector.CreateFromMouseEvent(e));
    };

    window.onmousedown = e => {
      map.dragStart(Vector.CreateFromMouseEvent(e));
    };

    window.onmousemove = e => {
      map.dragMove(Vector.CreateFromMouseEvent(e));
    };

    window.onmouseup = e => {
      map.dragEnd(Vector.CreateFromMouseEvent(e));
    };

    let lastTouch: Vector;

    window.ontouchstart = ({ touches }) => {
      // map.dragStart(new Vector(touches[0].clientX, touches[0].clientY));
    };

    window.ontouchmove = ({ touches }) => {
      // lastTouch = new Vector(touches[0].clientX, touches[0].clientY);
      // map.dragMove(lastTouch);
    };

    window.ontouchend = () => {
      // map.dragEnd(lastTouch);
    };

    window.onkeydown = ({ key }) => {
      switch (key) {
        case 'ArrowRight':
          map.move(new Vector(222, 0));
          break;
        case 'ArrowLeft':
          map.move(new Vector(-222, 0));
          break;
        case 'ArrowUp':
          map.move(new Vector(0, -222));
          break;
        case 'ArrowDown':
          map.move(new Vector(0, 222));
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
