import { Hexagon } from './Hexagon';
import { Size } from './Size';

export class Grid {
  cells: Hexagon[][][];

  private _size: Size;

  get size(): Size {
    return this._size;
  }

  constructor() {
    this.cells = [];
    this._size = new Size(0, 0);
  }

  *[Symbol.iterator](): IterableIterator<Hexagon> {
    for (let row = 0; row < this.cells.length; row++) {
      for (let column = 0; column < this.cells[row].length; column++) {
        for (let hexIndex = 0; hexIndex < this.cells[row][column].length; hexIndex++) {
          yield this.cells[row][column][hexIndex];
        }
      }
    }
  }

  getHexagon(id: number): Hexagon {
    let hexagonId = 0;

    // TODO: search can be optimized by looping through row/column length
    // and only in needed cell looping through hexagons
    for (const hexagon of this) {
      if (hexagonId === id) {
        return hexagon;
      }

      hexagonId++;
    }

    throw new Error(`there is no hexagon on id:${id}`);
  }

  addRow(row: Hexagon[][]): void {
    this.cells.push(row);
  }

  addColumn(row: number, column: Hexagon[]): void {
    this.cells[row].push(column);
  }

  addHex(row: number, column: number, hexagon: Hexagon): void {
    this.cells[row][column].push(hexagon);
  }

  // TODO: find better solution than passing hexSize to calcWidth
  calcWidth(hexSize: Size): void {
    const lastRow = this.cells[this.cells.length - 1];
    const lastColumn = lastRow[lastRow.length - 1];
    const lastHex = lastColumn[lastColumn.length - 1];
    const difference = lastHex.position.copy().addSize(hexSize).subtract(this.cells[0][0][0].position);

    // HACK: test
    this._size = Size.FromWindow();
    this._size = new Size(difference.x, difference.y);
  }
}
