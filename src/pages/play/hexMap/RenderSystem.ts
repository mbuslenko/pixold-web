import { Size } from './Size';
import { Vector } from './Vector';

export class RenderSystem {
  private _ctx: CanvasRenderingContext2D;

  constructor (ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;

    this._ctx.lineWidth = 2;
    this._ctx.strokeStyle = 'blue';
    this._ctx.fillStyle = 'grey';
  }

  drawSetup (): void {
    this._ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
  }

  drawHex (hexPosition: Vector, hexSize: Size): void {
    this._ctx.beginPath();
    this._ctx.fillRect(
      hexPosition.x,
      hexPosition.y,
      hexSize.width,
      hexSize.height
    );
    // this._drawHex(this._ctx, x, y, width);
    this._ctx.fill();
    this._ctx.closePath();
  }

  private _drawHex (ctx: CanvasRenderingContext2D, position: Vector, r: number): void {
    ctx.beginPath();
    ctx.moveTo(position.x, position.y - r);

    for (let a = 1; a < 6; ++a) {
      const angle = (a * Math.PI) / 3;

      ctx.lineTo(position.x + Math.sin(angle) * r, position.y - Math.cos(angle) * r);
    }

    ctx.closePath();
  }
}
