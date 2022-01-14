import { Size } from './Size';

export class Vector {
  x: number;
  y: number;

  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add (vector: Vector): Vector {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  subtract (vector: Vector): Vector {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  }

  subtractSize (size: Size): Vector {
    this.x -= size.width;
    this.y -= size.height;

    return this;
  }

  divideByValue (value: number): Vector {
    this.x /= value;
    this.y /= value;

    return this;
  }

  equal (vector: Vector): boolean {
    // HACK: after i change animation function i need to remove Math.round()
    return Math.round(this.x) === Math.round(vector.x) && Math.round(this.y) === Math.round(vector.y);
  }

  scale (scaleFactor: number): Vector {
    this.x *= scaleFactor;
    this.y *= scaleFactor;

    return  this;
  }

  // isAfter (position: Position): boolean {
  //   return this.x >= position.x && this.y >= position.y;
  // }

  // isBefore (position: Position): boolean {
  //   return this.x <= position.x && this.y <= position.y;
  // }

  copy (): Vector {
    return new Vector(this.x, this.y);
  }

  static FromMouseEvent (e: MouseEvent): Vector {
    return new Vector(e.clientX, e.clientY);
  }

  static FromTouch (touche: Touch): Vector {
    return new Vector(touche.clientX, touche.clientY);
  }

  static FromWindowEndPosition (): Vector {
    return new Vector(window.innerWidth, window.innerHeight);
  }

  static InScreenCenter (): Vector {
    return new Vector(window.innerWidth / 2, window.innerHeight / 2);
  }
}
