import { Size } from './Size';
import { Vector } from './Vector';

export class Grid {
  cells: Vector[][][];

  private _size: Size;
  private _center: Vector;

  get size(): Size {
    return this._size;
  }

  get center(): Vector {
    return this._center;
  }

  constructor() {
    this.cells = [];
    this._size = new Size(0, 0);
    this._center = new Vector(0, 0);
  }

  *[Symbol.iterator](): IterableIterator<Vector> {
    for (let row = 0; row < this.cells.length; row++) {
      for (let column = 0; column < this.cells[row].length; column++) {
        for (let hexIndex = 0; hexIndex < this.cells[row][column].length; hexIndex++) {
          yield this.cells[row][column][hexIndex];
        }
      }
    }
  }

  addRow(row: Vector[][]): void {
    this.cells.push(row);
  }

  addColumn(row: number, column: Vector[]): void {
    this.cells[row].push(column);
  }

  addHex(row: number, column: number, hex: Vector): void {
    this.cells[row][column].push(hex);
  }

  calcWidth(): void {
    const lastRow = this.cells[this.cells.length - 1];
    const lastColumn = lastRow[lastRow.length - 1];
    const lastHex = lastColumn[lastColumn.length - 1];
    const difference = lastHex.copy().subtract(this.cells[0][0][0]);

    // HACK: test
    this._size = Size.FromWindow();
    // this._size = new Size(difference.x, difference.y);
    this._center = difference.divideByValue(2);
  }
}
