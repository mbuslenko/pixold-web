import { Size } from './Size';

export class Vector {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vector): Vector {
    this.x += vector.x;
    this.y += vector.y;

    return this;
  }

  addX(x: number): Vector {
    this.x += x;

    return this;
  }

  addY(y: number): Vector {
    this.y += y;

    return this;
  }

  subtract(vector: Vector): Vector {
    this.x -= vector.x;
    this.y -= vector.y;

    return this;
  }

  subtractSize(size: Size): Vector {
    this.x -= size.width;
    this.y -= size.height;

    return this;
  }

  divide(vector: Vector): Vector {
    this.x /= vector.x;
    this.y /= vector.y;

    return this;
  }

  divideByValue(value: number): Vector {
    this.x /= value;
    this.y /= value;

    return this;
  }

  multiplyByValue(scaleFactor: number): Vector {
    this.x *= scaleFactor;
    this.y *= scaleFactor;

    return this;
  }

  max(xMax: number, yMax: number): Vector {
    this.x = Math.max(this.x, xMax);
    this.y = Math.max(this.y, yMax);

    return this;
  }

  min(xMin: number, yMin: number): Vector {
    this.x = Math.min(this.x, xMin);
    this.y = Math.min(this.y, yMin);

    return this;
  }

  abs(): Vector {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);

    return this;
  }

  getMiddle(vector: Vector): Vector {
    return this.add(vector).divideByValue(2);
  }

  copy(): Vector {
    return new Vector(this.x, this.y);
  }

  static FromEventPosition(e: MouseEvent | Touch | WheelEvent): Vector {
    return new Vector(e.clientX, e.clientY);
  }

  static FromWheelDelta(e: WheelEvent): Vector {
    return new Vector(e.deltaX, e.deltaY);
  }

  static FromWindowEndPosition(): Vector {
    return new Vector(window.innerWidth, window.innerHeight);
  }

  static InScreenCenter(): Vector {
    return new Vector(window.innerWidth / 2, window.innerHeight / 2);
  }
}
