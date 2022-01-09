import { Position } from './Position';
import { Size } from './Size';

export class HexMap {
  private _ctx: CanvasRenderingContext2D;
  private _map: Position[];
  private _hexSize: Size;
  private _scale: number;
  private _scaleVelocity: number;
  private _finalScale: number;
  private _offset: Position;
  private _offsetVelocity: number;
  private _finalPosition: Position;
  private _animate: boolean;
  private _isDragged: boolean;
  private _dragStartPosition: Position;

  constructor (ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
    this._map = [];
    this._hexSize = new Size(12, 12);
    this._scale = 1;
    this._scaleVelocity = 0.05;
    this._finalScale = 1;
    this._offset = new Position(0, 0);
    this._offsetVelocity = 0.15;
    this._finalPosition = new Position(0, 0);
    this._animate = false;
    this._isDragged = false;
    this._dragStartPosition = new Position(0, 0);
  }

  private _drawHex (context: CanvasRenderingContext2D, x: number, y: number, r: number): void {
    context.moveTo(x, y - r);
    for (let a = 1; a < 6; ++a) {
      const angle = (a * Math.PI) / 3;

      context.lineTo(x + Math.sin(angle) * r, y - Math.cos(angle) * r);
    }
    context.closePath();
  }

  private _adjustPosition (position: Position): Position {
    return position
      .copy()
      .scale(this._scale)
      .add(this._offset);
  }

  private _adjustHexSize (): Size {
    return this._hexSize
      .copy()
      .scale(this._scale);
  }

  private _mouseInHex (mousePosition: Position, hexPosition: Position, hesSize: Size): boolean {
    const { x: mouseX, y: mouseY } = mousePosition;
    const { x: hexX, y: hexY } = hexPosition;
    const { width: hexWidth, height: hexHeight } = hesSize;

    return (
      mouseX >= hexX && mouseX <= hexX + hexWidth &&
      mouseY >= hexY && mouseY <= hexY + hexHeight
    );
  }

  private _smoothMove (): void {
    if (!this._animate) {
      return;
    }

    // const moveX = (this._finalPosition.x - this._offset.x) * this._offsetVelocity;
    // const moveY = (this._finalPosition.y - this._offset.y) * this._offsetVelocity;

    // this._offset.x += moveX;
    // this._offset.y += moveY;

    this._offset.add(
      this._finalPosition
        .subtract(this._offset)
        .scale(this._offsetVelocity)
    );

    // this.drawMap();

    // const endX: boolean = moveX > 0
    //                       ? this._offset.x >= this._finalPosition.x - 1
    //                       : this._offset.x <= this._finalPosition.x + 1;
    // const endY: boolean = moveY > 0
    //                       ? this._offset.y >= this._finalPosition.y - 1
    //                       : this._offset.y <= this._finalPosition.y + 1;

    // if (endX && endY) {
    //   this._offset.x = this._finalPosition.x;
    //   this._offset.y = this._finalPosition.y;
    //   this._animate = false;
    //   this.drawMap();

    //   return;
    // }

    requestAnimationFrame(this._smoothMove.bind(this));
  }

  private _smoothScaling (): void {
    const scale = (this._finalScale - this._scale) * this._scaleVelocity;

    this._scale += scale;
    this.drawMap();

    if (
      scale >= 0 && this._scale >= this._finalScale - 0.01 ||
      scale < 0 && this._scale <= this._finalScale + 0.01
    ) {
      this._scale = this._finalScale;
      this.drawMap();

      return;
    }

    requestAnimationFrame(this._smoothScaling.bind(this));
  }

  init (): void {
    this._ctx.lineWidth = 2;
    this._ctx.strokeStyle = 'blue';
    this._ctx.fillStyle = 'grey';
  }

  generateMap (hexCount = 100): void {
    const { width, height } = this._hexSize;
    let xOffset = 0;
    let row = 0;

    this._map = [];

    for (let i = 0; i < hexCount; i++) {
      let x = i * width - xOffset + i * width;

      if (x >= window.innerWidth) {
        xOffset += window.innerWidth;
        row++;
        x = i * width - xOffset + i * width;
      }

      const y = row * height + row * height;

      this._map.push(new Position(x, y));
    }
  }

  drawMap (): void {
    this._ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
    // this._ctx.fillStyle = 'grey';

    const { width, height } = this._adjustHexSize();

    for (const position of this._map) {
      const { x, y } = this._adjustPosition(position);

      this._ctx.beginPath();
      this._ctx.fillRect(x, y, width, height);
      // this._drawHex(this._ctx, x, y, width);
      this._ctx.fill();
      this._ctx.closePath();
    }
  }

  click (mousePosition: Position): void {
    const hexSize = this._adjustHexSize();

    for (const hex of this._map) {
      const hexPosition = this._adjustPosition(hex);

      if (this._mouseInHex(mousePosition, hexPosition, hexSize)) {
        this._ctx.fillStyle = 'green';
        this._ctx.fillRect(
          hexPosition.x,
          hexPosition.y,
          hexSize.width,
          hexSize.height,
        );
        this._ctx.strokeRect(
          hexPosition.x - 2,
          hexPosition.y - 2,
          hexSize.width + 2,
          hexSize.height + 2,
        );
        this._ctx.fillStyle = 'grey';
      }
    }
  }

  move (offsetX: number, offsetY: number): void {
    this._finalPosition.x += offsetX;
    this._finalPosition.y += offsetY;

    if (!this._animate) {
      this._animate = true;
      this._smoothMove();
    }
  }

  scale (scaleFactor: number): void {
    this._finalScale += scaleFactor;
    this._smoothScaling();
  }

  dragStart (mousePosition: Position): void {
    this._isDragged = true;
    this._animate = true;
    this._dragStartPosition = new Position(mousePosition.x, mousePosition.y);
    this._smoothMove();
  }

  dragMove (mousePosition: Position): void {
    if (!this._isDragged) {
      return;
    }

    this._finalPosition.x += (this._dragStartPosition.x - mousePosition.x) * this._offsetVelocity;
    this._finalPosition.y += (this._dragStartPosition.y - mousePosition.y) * this._offsetVelocity;

    // this._smoothMove();
  }

  dragEnd (mousePosition: Position): void {
    if (!this._isDragged) {
      return;
    }

    this._finalPosition.x += this._dragStartPosition.x - mousePosition.x;
    this._finalPosition.y += this._dragStartPosition.y - mousePosition.y;
    this._isDragged = false;
    this._animate = false;

    // this._smoothMove();
  }

  zoom (mousePosition: Position, scaleFactor: number): void {
    this.move(
      mousePosition.x - window.innerWidth,
      mousePosition.y - window.innerHeight,
    );
    this.scale(scaleFactor);
  }
}
