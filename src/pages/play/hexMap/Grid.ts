import { Hexagon } from './Hexagon';

export class Grid {
  cells: Hexagon[][][];

  constructor() {
    this.cells = [];
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

    // HACK: i get error when trying to get hexagon out of visible grid
    for (const hexagon of this) {
      return hexagon;
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
}
