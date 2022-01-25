import { Hexagon } from './Hexagon';

export class Grid {
  value: Hexagon[][][];

  constructor() {
    this.value = [];
  }

  get rowCount(): number {
    return this.value.length;
  }

  get columnCount(): number {
    return this.value[0].length;
  }

  *[Symbol.iterator](): IterableIterator<Hexagon> {
    for (let row = 0; row < this.value.length; row++) {
      for (let column = 0; column < this.value[row].length; column++) {
        for (let hexIndex = 0; hexIndex < this.value[row][column].length; hexIndex++) {
          yield this.value[row][column][hexIndex];
        }
      }
    }
  }

  addRow(row: Hexagon[][]): void {
    this.value.push(row);
  }

  addColumn(row: number, column: Hexagon[]): void {
    this.value[row].push(column);
  }

  addHex(row: number, column: number, hexagon: Hexagon): void {
    this.value[row][column].push(hexagon);
  }
}
