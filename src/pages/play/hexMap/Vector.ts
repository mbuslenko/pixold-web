import { Size } from './Size'

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

  static CreateFromMouseEvent (e: MouseEvent): Vector {
    return new Vector(e.clientX, e.clientY);
  }
}
