import { Vector } from './Vector';

export class Hexagon {
  position: Vector;
  color: string;
  id: number;

  private static _radius = 5;
  private static _radiusHalf = Hexagon._radius / 2;
  static xPathOffset = Hexagon._radius * 0.8660254037844386;

  static set radius(radius: number) {
    Hexagon._radius = radius;
    Hexagon._radiusHalf = radius / 2;
    Hexagon.xPathOffset = radius * 0.8660254037844386;
  }

  static get radius(): number {
    return Hexagon._radius;
  }

  static get radiusHalf(): number {
    return Hexagon._radiusHalf;
  }

  constructor(position: Vector, color: string, id: number) {
    this.position = position;
    this.color = color;
    this.id = id;
  }
}
