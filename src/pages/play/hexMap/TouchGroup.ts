import { Vector } from './Vector';

export class TouchGroup {
  firstTouch: Vector;
  secondTouch: Vector;
  middlePoint: Vector;

  constructor(firstTouch: Vector, secondTouch: Vector) {
    this.firstTouch = firstTouch;
    this.secondTouch = secondTouch;
    this.middlePoint = this.firstTouch.copy().getMiddle(this.secondTouch);
  }

  static FromTouchList(toucheList: TouchList): TouchGroup {
    return new TouchGroup(Vector.FromEventPosition(toucheList[0]), Vector.FromEventPosition(toucheList[1]));
  }
}
