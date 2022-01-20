import { Vector } from './Vector';

export class Hexagon {
  position: Vector;
  color: string;
  // TODO: get rid of id: number
  id: number;

  constructor(position: Vector, color: string, id: number) {
    this.position = position;
    this.color = color;
    this.id = id;
  }
}
