import { Vector } from './Vector';
import { Size } from './Size';

export class HexMap {
  private _ctx: CanvasRenderingContext2D;
  private _map: Vector[];
  private _hexSize: Size;
  private _scale: number;
  private _scaleVelocity: number;
  private _finalScale: number;
  private _offset: Vector;
  private _offsetVelocity: number;
  private _finalOffset: Vector;
  private _stopScaleAnimation: boolean;
  private _stopOffsetAnimation: boolean
  private _stopAnimation: boolean;
  private _stopDragging: boolean;
  private _dragStartPosition: Vector;
  private _dragStartOffset: Vector;

  constructor (ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
    this._map = [];
    this._hexSize = new Size(12, 12);
    this._scale = 1;
    this._scaleVelocity = 0.05;
    this._finalScale = 1;
    this._offset = new Vector(0, 0);
    this._offsetVelocity = 0.15;
    this._finalOffset = new Vector(0, 0);
    this._stopScaleAnimation = true;
    this._stopOffsetAnimation = true;
    this._stopAnimation = true;
    this._stopDragging = true;
    this._dragStartPosition = new Vector(0, 0);
    this._dragStartOffset = new Vector(0, 0);
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

      const position = new Vector(
        x,
        row * height + row * height,
      );

      this._ctx.fillRect(position.x, position.y, width, height);
      this._map.push(position);
    }
  }

  _drawMap (): void {
    const animate = () => {
      if (this._stopAnimation) {
        return;
      }

      this._ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);

      this._smoothMove();
      this._smoothScaling();

      const { width, height } = this._adjustHexSize();

      for (const position of this._map) {
        const { x, y } = this._adjustPosition(position);

        this._ctx.beginPath();
        this._ctx.fillRect(x, y, width, height);
        // this._drawHex(this._ctx, x, y, width);
        this._ctx.fill();
        this._ctx.closePath();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  private _drawHex (context: CanvasRenderingContext2D, x: number, y: number, r: number): void {
    context.moveTo(x, y - r);
    for (let a = 1; a < 6; ++a) {
      const angle = (a * Math.PI) / 3;

      context.lineTo(x + Math.sin(angle) * r, y - Math.cos(angle) * r);
    }
    context.closePath();
  }

  private _adjustPosition (position: Vector): Vector {
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

  click (mousePosition: Vector): void {
    if (!this._stopAnimation) {
      return;
    }

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

  private _mouseInHex (mousePosition: Vector, hexPosition: Vector, hesSize: Size): boolean {
    const { x: mouseX, y: mouseY } = mousePosition;
    const { x: hexX, y: hexY } = hexPosition;
    const { width: hexWidth, height: hexHeight } = hesSize;

    return (
      mouseX >= hexX && mouseX <= hexX + hexWidth &&
      mouseY >= hexY && mouseY <= hexY + hexHeight
    );
  }

  move (offset: Vector): void {
    this._finalOffset.add(offset);
    this._stopOffsetAnimation = false;

    if (this._stopAnimation) {
      this._stopAnimation = false;
      this._drawMap();
    }
  }

  private _smoothMove (): void {
    if (this._stopOffsetAnimation) {
      return;
    }

    const move = this._finalOffset.subtract(this._offset);
    const endX: boolean = move.x > 0
                          ? this._offset.x >= this._finalOffset.x - 1
                          : this._offset.x <= this._finalOffset.x + 1;
    const endY: boolean = move.x > 0
                          ? this._offset.y >= this._finalOffset.y - 1
                          : this._offset.y <= this._finalOffset.y + 1;

    this._offset.add(move.scale(this._offsetVelocity));

    if (endX && endY) {
      this._offset = this._finalOffset;
      this._stopOffsetAnimation = true;
      this._stopAnimation = this._stopOffsetAnimation && this._stopScaleAnimation;
    }
  }

  scale (scaleFactor: number): void {
    this._finalScale += scaleFactor;
    this._stopScaleAnimation = false;

    if (this._stopAnimation) {
      this._stopAnimation = false;
      this._drawMap();
    }
  }

  private _smoothScaling (): void {
    if (this._stopScaleAnimation) {
      return;
    }

    const scale = (this._finalScale - this._scale) * this._scaleVelocity;

    this._scale += scale;

    if (
      scale >= 0 && this._scale >= this._finalScale - 0.001 ||
      scale < 0 && this._scale <= this._finalScale + 0.001
    ) {
      this._scale = this._finalScale;
      this._stopScaleAnimation = true;
      this._stopAnimation = this._stopScaleAnimation && this._stopOffsetAnimation;
    }
  }

  dragStart (mousePosition: Vector): void {
    this._stopDragging = false;
    this._dragStartPosition = new Vector(mousePosition.x, mousePosition.y);
    this._dragStartOffset = this._offset.copy();
  }

  dragMove (mousePosition: Vector): void {
    if (this._stopDragging) {
      return;
    }

    this._stopOffsetAnimation = false;
    this._stopAnimation = false;

    this._finalOffset = this._dragStartOffset.add(
      this._dragStartPosition
        .subtract(mousePosition)
        .scale(this._offsetVelocity)
    );
  }

  dragEnd (mousePosition: Vector): void {
    if (this._stopDragging) {
      return;
    }

    this._finalOffset.add(this._dragStartPosition.subtract(mousePosition));
    this._stopDragging = true;
  }

  zoom (mousePosition: Vector, scaleFactor: number): void {
    this.move(mousePosition.subtractSize(Size.CreateFromWindow()));
    this.scale(scaleFactor);
  }
}
