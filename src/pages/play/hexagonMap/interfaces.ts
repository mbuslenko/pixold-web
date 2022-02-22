import { Hexagon } from './Hexagon';
import { Vector } from './Vector';

export interface IHexagonAttack {
  attacker: Hexagon;
  defender: Hexagon;
}

export interface INewHexagonAttack {
  attacker: number;
  defender: number;
}

export interface IAttackLine {
  from: Vector;
  to: Vector;
  color: string;
}

export interface IHexagonMapData {
  x: number;
  y: number;
}
