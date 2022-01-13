import { Vector } from './Vector';

export class Grid {
  cells: Vector[][][];

  constructor () {
    this.cells = [];
  }

  * [Symbol.iterator] (): IterableIterator<Vector> {
    for (let row = 0; row < this.cells.length; row++) {
      for (let column = 0; column < this.cells[row].length; column++) {
        for (let hexIndex = 0; hexIndex < this.cells[row][column].length; hexIndex++) {
          yield this.cells[row][column][hexIndex];
        }
      }
    }
  }

  addRow (row: Vector[][]): void {
    this.cells.push(row);
  }

  addColumn (row: number, column: Vector[]): void {
    this.cells[row].push(column);
  }

  addHex (row: number, column: number, hex: Vector): void {
    this.cells[row][column].push(hex);
  }
}
