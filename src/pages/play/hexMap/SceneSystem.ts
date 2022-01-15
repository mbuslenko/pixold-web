import { Grid } from './Grid';
import { Size } from './Size';
import { Vector } from './Vector';

export class SceneSystem {
  private _scene: Grid;
  private _cellSize: number;
  private _hexSize: Size;
  activeHex?: Vector;

  get hexSize (): Size {
    return this._hexSize;
  }

  get sceneCenter (): Vector {
    return this._scene.center;
  }

  get sceneSize (): Size {
    return this._scene.size;
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
          this._scene.addHex(row, column, hexPosition);

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

    this._scene.calcWidth();
  }

  getVisibleHexes (scaleFactor: number, offset: Vector): Vector[] {
    const { x, y } = offset.copy().scale(scaleFactor);
    const { width: widthWindow, height: heightWindow } = Size.CreateFromWindow();
    const cellSize = this._cellSize * scaleFactor;
    let visibleCells: Vector[] = [];
    let notVisibleCells = 0;

    // TODO: search can be optimized
    for (let row = 0; row < this._scene.cells.length; row++) {
      for (let column = 0; column < this._scene.cells[row].length; column++) {
        if (
          (x + column * cellSize + cellSize >= 0 && x + column * cellSize <= widthWindow) &&
          (y + row * cellSize + cellSize >= 0 && y + row * cellSize <= heightWindow)
        ) {
          visibleCells = visibleCells.concat(this._scene.cells[row][column]);
        } else {
          // HACK: just for test
          notVisibleCells++;
        }
      }
    }

    console.log(`visible: ${this._scene.cells.flat().length}; not visible: ${notVisibleCells}`);

    return visibleCells;
  }
}
