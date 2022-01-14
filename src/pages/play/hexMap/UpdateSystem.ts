import { Size } from './Size';
import { Vector } from './Vector';

export class UpdateSystem {
  stopAnimation: boolean;

  private _stopScaleAnimation: boolean;
  private _stopOffsetAnimation: boolean
  private _stopDragAnimation: boolean;
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
    this.stopAnimation = true;

    this._stopScaleAnimation = true;
    this._stopOffsetAnimation = true;
    this._stopDragAnimation = true;
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
    this.stopAnimation = this._stopOffsetAnimation && this._stopScaleAnimation && this._stopDragAnimation;
  }

  move (offset: Vector): void {
    console.log(offset);
    this._finalOffset.add(offset);
    this._offsetStep = this._finalOffset.copy().subtract(this._offset).divideByValue(this._animationDuration);
    this._stopOffsetAnimation = false;
    this.stopAnimation = false;
  }

  makeMoveStep (): void {
    if (this._stopOffsetAnimation) {
      return;
    }

    this._offset.add(this._offsetStep);

    if (this._offset.equal(this._finalOffset)) {
      this._stopOffsetAnimation = true;
      this._stopAnimation();
    }
  }

  scale (scaleFactor: number): void {
    this._finalScaleFactor = Math.max(this._finalScaleFactor + scaleFactor, 0.25);
    this._scaleStep = (this._finalScaleFactor - this._scaleFactor) / this._animationDuration;
    this._stopScaleAnimation = false;
    this.stopAnimation = false;
  }

  makeScaleStep (): void {
    if (this._stopScaleAnimation) {
      return;
    }


    this._scaleFactor += this._scaleStep;

    if (this._scaleFactor >= this._finalScaleFactor - 0.005 && this._scaleFactor <= this._finalScaleFactor + 0.005) {
      this._scaleFactor = this._finalScaleFactor;
      this._stopScaleAnimation = true;
      this._stopAnimation();
    }
  }

  dragStart (mousePosition: Vector): void {
    this._stopDragAnimation = false;
    this._dragPrevPosition = mousePosition;
  }

  dragMove (mousePosition: Vector): void {
    if (this._stopDragAnimation) {
      return;
    }

    this._stopOffsetAnimation = false;
    this.stopAnimation = false;

    this.move(mousePosition.copy().subtract(this._dragPrevPosition));

    this._dragPrevPosition = mousePosition;
  }

  dragEnd (): void {
    if (this._stopDragAnimation) {
      return;
    }

    this._stopDragAnimation = true;
    this._stopAnimation();
  }

  zoom (mousePosition: Vector, scaleFactor: number, gridCenter: Vector): void {
    // TODO: need to zoom point where position to center, not center to position
    // FIXME: movement while zooming is weird
    this.scale(scaleFactor);
    this.move(
      mousePosition
        .subtract(this._finalOffset.copy().scale(this._finalScaleFactor))
        .subtract(gridCenter.copy().scale(this._finalScaleFactor))
        .divideByValue(this._finalScaleFactor)
    );
  }
}
