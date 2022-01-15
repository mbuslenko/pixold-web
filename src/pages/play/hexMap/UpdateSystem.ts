import { Size } from './Size';
import { Vector } from './Vector';

// TODO: add boundaries for scale() and move()
export class UpdateSystem {
  stopTransformAnimation: boolean;

  private _stopScaleAnimation: boolean;
  private _stopOffsetAnimation: boolean
  private _stopDragging: boolean;
  private _animationDuration: number;
  private _scaleFactor: number;
  private _finalScaleFactor: number;
  private _scaleStep: number;
  private _offset: Vector;
  private _finalOffset: Vector;
  private _offsetStep: Vector;
  private _dragPrevPosition: Vector;

  get scaleFactor (): number {
    return this._scaleFactor;
  }

  get offset (): Vector {
    return this._offset;
  }

  constructor () {
    this.stopTransformAnimation = true;

    this._stopScaleAnimation = true;
    this._stopOffsetAnimation = true;
    this._stopDragging = true;
    this._animationDuration = 10;
    this._scaleFactor = 1;
    this._finalScaleFactor = 1;
    this._scaleStep = 0;
    this._offset = new Vector(0, 0);
    this._finalOffset = new Vector(0, 0);
    this._offsetStep = new Vector(0, 0);
    this._dragPrevPosition = new Vector(0, 0);
  }

  adjustPosition (position: Vector): Vector {
    return position
      .copy()
      .add(this._offset)
      .scale(this._scaleFactor);
  }

  adjustHexSize (hexSize: Size): Size {
    return hexSize
      .copy()
      .scale(this._scaleFactor);
  }

  private _stopAnimation (): void {
    this.stopTransformAnimation = this._stopOffsetAnimation && this._stopScaleAnimation;
  }

  move (offset: Vector): void {
    this._finalOffset.add(offset);
    this._offsetStep = this._finalOffset.copy().subtract(this._offset).divideByValue(this._animationDuration);
    this._stopOffsetAnimation = false;
    this.stopTransformAnimation = false;
  }

  makeMoveStep (): void {
    if (this._stopOffsetAnimation) {
      return;
    }

    this._offset.add(this._offsetStep);

    if (this._offset.equal(this._finalOffset)) {
      this._offset = this._finalOffset.copy();
      this._stopOffsetAnimation = true;
      this._stopAnimation();
    }
  }

  scale (scaleFactor: number): void {
    this._finalScaleFactor = Math.max(this._finalScaleFactor + scaleFactor, 0.25);
    this._scaleStep = (this._finalScaleFactor - this._scaleFactor) / this._animationDuration;
    this._stopScaleAnimation = false;
    this.stopTransformAnimation = false;
  }

  makeScaleStep (): void {
    if (this._stopScaleAnimation) {
      return;
    }

    this._scaleFactor += this._scaleStep;

    if (
      this._scaleFactor >= this._finalScaleFactor - 0.05 &&
      this._scaleFactor <= this._finalScaleFactor + 0.05
    ) {
      this._scaleFactor = this._finalScaleFactor;
      this._stopScaleAnimation = true;
      this._stopAnimation();
    }
  }

  dragStart (mousePosition: Vector): void {
    this._stopDragging = false;
    this._dragPrevPosition = mousePosition;
  }

  dragMove (mousePosition: Vector): void {
    if (this._stopDragging) {
      return;
    }

    this._stopOffsetAnimation = false;
    this.stopTransformAnimation = false;

    this.move(mousePosition.copy().subtract(this._dragPrevPosition));

    this._dragPrevPosition = mousePosition;
  }

  dragEnd (): void {
    this._stopDragging = true;
  }

  zoom (mousePosition: Vector, scaleFactor: number, gridCenter: Vector, gridSize: Size): void {
    // TODO: need to zoom point where position to center, not center to position
    // FIXME: movement while zooming is weird

    this.scale(scaleFactor);

    const mousePositionInGrid = mousePosition.subtract(this._finalOffset.copy());
    const gridPointToCenterDistance = Vector.InScreenCenter().subtract(mousePositionInGrid);

    this.move(gridPointToCenterDistance);
  }
}
