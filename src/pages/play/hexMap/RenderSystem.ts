import { Matrix } from './Matrix';
import { Size } from './Size';
import { Vector } from './Vector';

export class RenderSystem {
  private _ctx: CanvasRenderingContext2D;
  private _lineWidth: number;

  constructor(ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
    this._lineWidth = 2;
    this._ctx.strokeStyle = 'blue';
    this._ctx.lineWidth = 2;
  }

  clear(): void {
    this._ctx.clearRect(-2, -2, window.innerWidth * 2, window.innerHeight * 2);
  }

  clearActiveHex(hexPosition: Vector, hexSize: Size, scaleFactor: number): void {
    const lineWidth = this._lineWidth * scaleFactor;

    this._ctx.clearRect(
      hexPosition.x - lineWidth * 2,
      hexPosition.y - lineWidth * 2,
      hexSize.width + lineWidth * 4,
      hexSize.height + lineWidth * 4,
    );
  }

  setTransform(transform: Matrix): void {
    this._ctx.setTransform(
      transform.values[0][0],
      transform.values[1][0],
      transform.values[0][1],
      transform.values[1][1],
      transform.values[0][2],
      transform.values[1][2],
    );
  }

  setupForHex(): void {
    this._ctx.fillStyle = 'grey';
  }

  setupForActiveHex(): void {
    this._ctx.fillStyle = 'green';
    this._ctx.setLineDash([]);
  }

  drawHex(hexPosition: Vector, hexSize: Size): void {
    this._ctx.beginPath();
    this._ctx.fillRect(hexPosition.x, hexPosition.y, hexSize.width, hexSize.height);
    // this._drawHexPath(hexPosition, hexSize.width);
    this._ctx.fill();
    this._ctx.closePath();
  }

  drawActiveHex(hexPosition: Vector, hexSize: Size): void {
    this._ctx.beginPath();
    this._ctx.fillRect(hexPosition.x, hexPosition.y, hexSize.width, hexSize.height);
    this._ctx.strokeRect(
      hexPosition.x - this._ctx.lineWidth / 2,
      hexPosition.y - this._ctx.lineWidth / 2,
      hexSize.width + this._ctx.lineWidth,
      hexSize.height + this._ctx.lineWidth,
    );
  }

  setupForLine(): void {
    this._ctx.fillStyle = 'blue';
    this._ctx.setLineDash([100, 50]);
  }

  drawAttackLine(hexAttackPosition: Vector, hexDefenderPosition: Vector): void {
    const middlePoint = hexDefenderPosition.copy().add(hexAttackPosition).divideByValue(2).addY(-200);

    this._ctx.beginPath();
    this._ctx.moveTo(hexAttackPosition.x, hexAttackPosition.y);
    this._ctx.quadraticCurveTo(middlePoint.x, middlePoint.y, hexDefenderPosition.x, hexDefenderPosition.y);
    this._ctx.stroke();
    this._ctx.fillRect(hexDefenderPosition.x, hexDefenderPosition.y, 12, 12);
  }

  private _drawHexPath(position: Vector, r: number): void {
    this._ctx.beginPath();
    this._ctx.moveTo(position.x, position.y - r);

    for (let a = 1; a < 6; ++a) {
      const angle = (a * Math.PI) / 3;

      this._ctx.lineTo(position.x + Math.sin(angle) * r, position.y - Math.cos(angle) * r);
    }

    this._ctx.closePath();
  }
}
