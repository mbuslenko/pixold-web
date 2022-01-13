import { Grid } from './Grid';
import { Size } from './Size';
import { Vector } from './Vector';

export class SceneSystem {
  private _scene: Grid;
  private _cellSize: number;
  private _hexSize: Size;
  activeHexIndex?: number;

  get hexSize (): Size {
    return this._hexSize;
  }

  constructor () {
    this._cellSize = 200;
    this._hexSize = new Size(12, 12);
    this._scene = this._generateGrid(this._cellSize);
    this._fillGrid();
  }

  private _generateGrid (cellSize: number): Grid {
    const grid: Grid = new Grid();
    const gridRowCount: number = Math.ceil(window.innerHeight / cellSize);
    const gridColumnCount: number = Math.ceil(window.innerWidth / cellSize);

    for (let row = 0; row < gridRowCount; row++) {
      grid.addRow([]);

      for (let column = 0; column < gridColumnCount; column++) {
        grid.addColumn(row, []);
      }
    }

    return grid;
  }

  private _isHexInColumn (hexPosition: Vector, rowIndex: number, columnIndex: number): boolean {
    const startX: number = columnIndex * this._cellSize;
    const startY: number = rowIndex * this._cellSize;
    const endX: number = startX + this._cellSize;
    const endY: number = startY + this._cellSize;

    return (hexPosition.x >= startX && hexPosition.x <= endX) &&
           (hexPosition.y >= startY && hexPosition.y <= endY);
  }

  private _addHex (hexPosition: Vector): void {
    for (let row = 0; row < this._scene.cells.length; row++) {
      for (let column = 0; column < this._scene.cells[row].length; column++) {
        if (this._isHexInColumn(hexPosition, row, column)) {
          this._scene.cells[row][column].push(hexPosition);

          return;
        }
      }
    }
  }

  private _fillGrid (): void {
    const { width, height } = this._hexSize;
    let xOffset = 0;
    let row = 0;

    for (let i = 0; i < 3000; i++) {
      let x = i * width - xOffset + i * width;

      if (x >= window.innerWidth) {
        xOffset += window.innerWidth;
        row++;
        x = i * width - xOffset + i * width;
      }

      const hexPosition = new Vector(
        x,
        row * height + row * height,
      );

      this._addHex(hexPosition);
    }
  }

  getVisibleCells (scaleFactor: number, offset: Vector): Grid {
    // TODO: add only visible cells
    // const visibleCells: Grid = new Grid();
    // return visibleCells;
    return this._scene;
  }
}
