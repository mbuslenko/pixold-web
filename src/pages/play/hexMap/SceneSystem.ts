import { Grid } from './Grid';
import { Matrix } from './Matrix';
import { Size } from './Size';
import { Vector } from './Vector';

export interface HexAttack {
  attacker: Vector;
  defender: Vector;
}

export class SceneSystem {
  private _scene: Grid;
  private _visibleScene: Vector[];
  private _cellSize: number;
  private _hexSize: Size;
  attackingHexes: HexAttack[];
  activeHex: Vector | null;

  get visibleScene (): Vector[] {
    return this._visibleScene;
  }

  get hexSize(): Size {
    return this._hexSize;
  }

  get sceneCenter(): Vector {
    return this._scene.center;
  }

  get sceneSize(): Size {
    return this._scene.size;
  }

  constructor() {
    this._cellSize = 200;
    this._scene = this._generateGrid(this._cellSize);
    this._visibleScene = [];
    this._hexSize = new Size(12, 12);
    this.attackingHexes = [];
    this.activeHex = null;
    this._fillGrid();
  }

  private _generateGrid(cellSize: number): Grid {
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

  private _isHexInColumn(hexPosition: Vector, rowIndex: number, columnIndex: number): boolean {
    const startX: number = columnIndex * this._cellSize;
    const startY: number = rowIndex * this._cellSize;
    const endX: number = startX + this._cellSize;
    const endY: number = startY + this._cellSize;

    return hexPosition.x >= startX && hexPosition.x <= endX && hexPosition.y >= startY && hexPosition.y <= endY;
  }

  private _addHex(hexPosition: Vector): void {
    for (let row = 0; row < this._scene.cells.length; row++) {
      for (let column = 0; column < this._scene.cells[row].length; column++) {
        if (this._isHexInColumn(hexPosition, row, column)) {
          this._scene.addHex(row, column, hexPosition);

          return;
        }
      }
    }
  }

  private _fillGrid(): void {
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

      const hexPosition = new Vector(x, row * height + row * height);

      this._addHex(hexPosition);
    }

    this._scene.calcWidth();

    // HACK: test
    const lastRow = this._scene.cells[this._scene.cells.length - 1];
    const lastColumn = lastRow[lastRow.length - 1];
    const lastHex = lastColumn[lastColumn.length - 1];

    this.attackingHexes.push({
      attacker: this._scene.cells[0][0][0],
      defender: lastHex,
    });
  }

  updateScene(mapTransform: Matrix): void {
    const { x, y } = mapTransform.getTranslation();
    const { width: widthWindow, height: heightWindow } = Size.FromWindow();
    const cellSize = this._cellSize * mapTransform.getScaleFactor();
    let notVisibleCells = 0;

    this._visibleScene = [];

    // TODO: search can be optimized
    for (let row = 0; row < this._scene.cells.length; row++) {
      for (let column = 0; column < this._scene.cells[row].length; column++) {
        if (
          x + column * cellSize + cellSize >= 0 &&
          x + column * cellSize <= widthWindow &&
          y + row * cellSize + cellSize >= 0 &&
          y + row * cellSize <= heightWindow
        ) {
          this._visibleScene = this._visibleScene.concat(this._scene.cells[row][column]);
        } else {
          // HACK: just for test
          notVisibleCells++;
        }
      }
    }

    // console.log(`visible: ${this._scene.cells.flat().length}; not visible: ${notVisibleCells}`);
  }
}
