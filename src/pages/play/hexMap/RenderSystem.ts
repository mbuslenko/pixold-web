import { Size } from './Size';
import { Vector } from './Vector';

export class RenderSystem {
  private _ctx: CanvasRenderingContext2D;
  private _lineWidth: number;

  constructor (ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
    this._lineWidth = 2;

    this._ctx.lineWidth = this._lineWidth;
    this._ctx.strokeStyle = 'blue';
    this._ctx.fillStyle = 'grey';
  }

  clear (): void {
    this._ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
  }

  clearActiveHex (hexPosition: Vector, hexSize: Size, scaleFactor: number): void {
    const lineWidth = this._lineWidth * scaleFactor;

    this._ctx.clearRect(
      hexPosition.x - lineWidth * 2,
      hexPosition.y - lineWidth * 2,
      hexSize.width + lineWidth * 4,
      hexSize.height + lineWidth * 4,
    );
  }

  drawHex (hexPosition: Vector, hexSize: Size): void {
    this._ctx.beginPath();
    this._ctx.fillRect(
      hexPosition.x,
      hexPosition.y,
      hexSize.width,
      hexSize.height
    );
    // this._drawHexPath(this._ctx, x, y, width);
    this._ctx.fill();
    this._ctx.closePath();
  }

  drawActiveHex (hexPosition: Vector, hexSize: Size, scaleFactor: number): void {
    const lineWidth = this._lineWidth * scaleFactor;

    this._ctx.lineWidth = lineWidth;
    this._ctx.fillStyle = 'green';

    this._ctx.beginPath();
    this._ctx.fillRect(
      hexPosition.x,
      hexPosition.y,
      hexSize.width,
      hexSize.height,
    );
    this._ctx.strokeRect(
      hexPosition.x - lineWidth,
      hexPosition.y - lineWidth,
      hexSize.width + lineWidth,
      hexSize.height + lineWidth,
    );
    this._ctx.fillStyle = 'grey';
  }

  drawAttackLine (hexAttackPosition: Vector, hexDefenderPosition: Vector, scaleFactor: number): void {
    const middlePoint = hexDefenderPosition
      .copy()
      .add(hexAttackPosition)
      .divideByValue(2)
      .addY(-(200 * scaleFactor));


    this._ctx.lineWidth = this._lineWidth * scaleFactor;
    this._ctx.fillStyle = 'blue';

    this._ctx.beginPath();
    this._ctx.setLineDash([100, 50]);
    this._ctx.moveTo(hexAttackPosition.x, hexAttackPosition.y);
    this._ctx.quadraticCurveTo(
      middlePoint.x, middlePoint.y,
      hexDefenderPosition.x, hexDefenderPosition.y
    );
    this._ctx.stroke();
    this._ctx.fillRect(
      hexDefenderPosition.x,
      hexDefenderPosition.y,
      12 * scaleFactor,
      12 * scaleFactor
    );

    this._ctx.fillStyle = 'grey';
  }

  private _drawHexPath (ctx: CanvasRenderingContext2D, position: Vector, r: number): void {
    ctx.beginPath();
    ctx.moveTo(position.x, position.y - r);

    for (let a = 1; a < 6; ++a) {
      const angle = (a * Math.PI) / 3;

      ctx.lineTo(position.x + Math.sin(angle) * r, position.y - Math.cos(angle) * r);
    }

    ctx.closePath();
  }
}
