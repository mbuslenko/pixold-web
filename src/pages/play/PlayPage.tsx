import { useEffect, useRef } from 'react';

export const PlayPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let ctx: CanvasRenderingContext2D | null | undefined;

  useEffect(() => {
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
  });

  return (
    <div>
      <canvas ref={canvasRef}/>
    </div>
  );
};
