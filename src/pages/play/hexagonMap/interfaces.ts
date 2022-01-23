import { Hexagon } from './Hexagon';

export interface HexagonAttack {
  attacker: Hexagon;
  defender: Hexagon;
}

export interface HexagonMapData {
  x: number;
  y: number;
}
