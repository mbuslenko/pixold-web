import { complex } from 'mathjs'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { HexMap } from './HexMap';

export const PlayPage: React.FC = () => {
  const [hexMap, setHexMap] = useState<HexMap>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let ctx: CanvasRenderingContext2D | null | undefined;

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

    // console.log(map);
    map.init();
    map.generateMap(30);
    map.drawMap();

    window.onwheel = ({ deltaY }) => {
      // console.log('scroll');
      if (deltaY < 0) {
        map.scale(1.2, complex(0, 0));
      } else {
        map.scale(0.83, complex(0, 0));
      }
    };

    window.onclick = (e) => {
      const { clientX, clientY } = e;

      // console.log(e);

      map.click(clientX, clientY);
    };

    window.onkeydown = ({ key }) => {
      switch (key) {
        case 'ArrowRight':
          map.move(50, 0);
          break;
        case 'ArrowLeft':
          map.move(-50, 0);
          break;
        case 'ArrowUp':
          map.move(0, -50);
          break;
        case 'ArrowDown':
          map.move(0, 50);
          break;
      }
    };
  });

  return (
    <div>
      <canvas ref={canvasRef}/>
    </div>
  );
};
