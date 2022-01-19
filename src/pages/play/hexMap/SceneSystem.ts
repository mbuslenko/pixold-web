import { Color } from '../../../shared/ts/enums';
import { IGetResponseAllHexagonOwned } from '../../../shared/ts/interfaces';
import { Grid } from './Grid';
import { Hexagon } from './Hexagon';
import { mapData } from './mapData';
import { Matrix } from './Matrix';
import { Size } from './Size';
import { Vector } from './Vector';

export interface HexAttack {
  attacker: Hexagon;
  defender: Hexagon;
}

export class SceneSystem {
  private _scene: Grid;
  private _visibleScene: Hexagon[];
  private _cellSize: number;
  // private _hexSize: Size;
  private _hexagonRadius: number;
  attackingHexes: HexAttack[];
  activeHex: Hexagon | null;

  get visibleScene(): Hexagon[] {
    return this._visibleScene;
  }

  get hexagonRadius(): number {
    return this._hexagonRadius;
  }

  // get hexSize(): Size {
  //   return this._hexSize;
  // }

  get sceneSize(): Size {
    return this._scene.size;
  }

  constructor() {
    this._cellSize = 200;
    this._scene = this._generateGrid(this._cellSize);
    this._visibleScene = [];
    // this._hexSize = new Size(12, 12);
    this._hexagonRadius = 5;
    this.attackingHexes = [];
    this.activeHex = null;
    this._fillGrid();
  }

  private _generateRandomColor(): string {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    if (randomColor === Color.PURPLE) {
      return this._generateRandomColor();
    }

    return randomColor;
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

  private _addHex(hexPosition: Vector, color: string, id: number): void {
    for (let row = 0; row < this._scene.cells.length; row++) {
      for (let column = 0; column < this._scene.cells[row].length; column++) {
        if (this._isHexInColumn(hexPosition, row, column)) {
          this._scene.addHex(row, column, new Hexagon(hexPosition, color, id));

          return;
        }
      }
    }
  }

  private _fillGrid(): void {
    let hexagonIndex = 0;

    for (const hexagon of mapData) {
      this._addHex(new Vector(hexagon.x, hexagon.y), Color.PURPLE, hexagonIndex++);
    }

    // this._scene.calcWidth(this._hexSize);
  }

  setAllOwnedHexagons(allOwnedHexagons: IGetResponseAllHexagonOwned): void {
    for (const owner of Object.values(allOwnedHexagons)) {
      const hexagonColor = this._generateRandomColor();

      for (const hexagonId of owner) {
        this._scene.getHexagon(hexagonId).color = hexagonColor;
      }
    }
  }

  updateScene(mapTransform: Matrix): void {
    const { x, y } = mapTransform.getTranslation();
    const { width: widthWindow, height: heightWindow } = Size.FromWindow();
    const cellSize = this._cellSize * mapTransform.getScaleFactor();
    // let notVisibleCells = 0;

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
          // notVisibleCells++;
        }
      }
    }

    // console.log(`visible: ${this._scene.cells.flat().length}; not visible: ${notVisibleCells}`);
  }
}
