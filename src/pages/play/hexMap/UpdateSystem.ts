import { Size } from './Size';
import { Vector } from './Vector';

export class UpdateSystem {
  stopAnimation: boolean;

  private _stopScaleAnimation: boolean;
  private _stopOffsetAnimation: boolean
  private _stopDragAnimation: boolean;

  private _scaleFactor: number;
  private _scaleVelocity: number;
  private _finalScale: number;
  private _offset: Vector;
  private _offsetVelocity: number;
  private _finalOffset: Vector;
  private _dragPrevPosition: Vector;
  private _dragStartPosition: Vector;

  get scaleFactor (): number {
    return this._scaleFactor;
  }

  get offset (): Vector {
    return this._offset;
  }

  constructor () {
    this.stopAnimation = true;

    this._stopScaleAnimation = true;
    this._stopOffsetAnimation = true;
    this._stopDragAnimation = true;

    this._scaleFactor = 1;
    this._scaleVelocity = 0.05;
    this._finalScale = 1;
    this._offset = new Vector(0, 0);
    this._offsetVelocity = 0.15;
    this._finalOffset = new Vector(0, 0);
    this._dragPrevPosition = new Vector(0, 0);
    this._dragStartPosition = new Vector(0, 0);
  }

  adjustPosition (position: Vector): Vector {
    return position
      .copy()
      .scale(this._scaleFactor)
      .add(this._offset);
  }

  adjustHexSize (hexSize: Size): Size {
    return hexSize
      .copy()
      .scale(this._scaleFactor);
  }

  click (mousePosition: Vector): void {
    // if (!this.stopAnimation) {
    //   return;
    // }

    // const hexSize = this._adjustHexSize();

    // for (const hex of this._map) {
    //   const hexPosition = this._adjustPosition(hex);

    //   if (this._mouseInHex(mousePosition, hexPosition, hexSize)) {
    //     this._ctx.fillStyle = 'green';
    //     this._ctx.fillRect(
    //       hexPosition.x,
    //       hexPosition.y,
    //       hexSize.width,
    //       hexSize.height,
    //     );
    //     this._ctx.strokeRect(
    //       hexPosition.x - 2,
    //       hexPosition.y - 2,
    //       hexSize.width + 2,
    //       hexSize.height + 2,
    //     );
    //     this._ctx.fillStyle = 'grey';
    //   }
    // }
  }

  positionInHex (position: Vector, hexPosition: Vector, hesSize: Size): boolean {
    const { x, y } = position;
    const { x: hexX, y: hexY } = hexPosition;
    const { width: hexWidth, height: hexHeight } = hesSize;

    return (
      x >= hexX && x <= hexX + hexWidth &&
      y >= hexY && y <= hexY + hexHeight
    );
  }

  private _stopAnimation (): void {
    this.stopAnimation = this._stopOffsetAnimation && this._stopScaleAnimation && this._stopDragAnimation;
  }

  move (offset: Vector): void {
    this._finalOffset.add(offset);
    this._stopOffsetAnimation = false;
    this.stopAnimation = false;
  }

  makeMoveStep (): void {
    if (this._stopOffsetAnimation) {
      return;
    }

    const move = this._finalOffset.copy().subtract(this._offset);
    const endX: boolean = move.x > 0
                          ? this._offset.x >= this._finalOffset.x - 1
                          : this._offset.x <= this._finalOffset.x + 1;
    const endY: boolean = move.y > 0
                          ? this._offset.y >= this._finalOffset.y - 1
                          : this._offset.y <= this._finalOffset.y + 1;

    this._offset.add(move.scale(this._offsetVelocity));

    if (endX && endY) {
      this._offset = this._finalOffset.copy();
      this._stopOffsetAnimation = true;
      this._stopAnimation();
    }
  }

  scale (scaleFactor: number): void {
    this._finalScale += scaleFactor;
    this._stopScaleAnimation = false;
    this.stopAnimation = false;
  }

  makeScaleStep (): void {
    if (this._stopScaleAnimation) {
      return;
    }

    const scale = (this._finalScale - this._scaleFactor) * this._scaleVelocity;

    this._scaleFactor += scale;

    if (
      scale >= 0 && this._scaleFactor >= this._finalScale - 0.001 ||
      scale < 0 && this._scaleFactor <= this._finalScale + 0.001
    ) {
      this._scaleFactor = this._finalScale;
      this._stopScaleAnimation = true;
      this._stopAnimation();
    }
  }

  dragStart (mousePosition: Vector): void {
    this._stopDragAnimation = false;
    this._dragPrevPosition = mousePosition;
    this._dragStartPosition = this._offset.copy();
  }

  dragMove (mousePosition: Vector): void {
    if (this._stopDragAnimation) {
      return;
    }

    this._stopOffsetAnimation = false;
    this.stopAnimation = false;

    this._finalOffset = this._dragStartPosition.copy().subtract(
      mousePosition.subtract(this._dragPrevPosition)
    );
  }

  dragEnd (mousePosition: Vector): void {
    if (this._stopDragAnimation) {
      return;
    }

    this._finalOffset = this._dragStartPosition.copy().subtract(
      mousePosition.subtract(this._dragPrevPosition)
    );
    this._stopDragAnimation = true;
    this._stopAnimation();
  }

  zoom (mousePosition: Vector, scaleFactor: number): void {
    this._finalOffset.subtract(
      Vector.CreateFromWindowEndPosition().subtract(mousePosition)
    );

    this.scale(scaleFactor);

    this._stopOffsetAnimation = false;
  }
}
