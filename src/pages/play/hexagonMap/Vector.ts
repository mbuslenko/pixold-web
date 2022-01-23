import { HexagonMapData } from './interfaces';
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

  distance(vector: Vector): number {
    const xDifference = this.x - vector.x;
    const yDifference = this.y - vector.y;

    return Math.sqrt(xDifference * xDifference + yDifference * yDifference);
  }

  getMiddle(vector: Vector): Vector {
    return this.add(vector).divideByValue(2);
  }

  copy(): Vector {
    return new Vector(this.x, this.y);
  }

  static FromHexagonData(hexagonData: HexagonMapData): Vector {
    return new Vector(hexagonData.x, hexagonData.y);
  }

  static FromEventPosition(e: MouseEvent | Touch | WheelEvent): Vector {
    return new Vector(e.clientX, e.clientY);
  }

  static FromWindowEndPosition(): Vector {
    return new Vector(window.innerWidth, window.innerHeight);
  }
}
