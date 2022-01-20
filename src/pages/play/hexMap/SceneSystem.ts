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
  private _scene: Hexagon[];
  private _sceneGrid: Grid;
  private _visibleScene: Hexagon[];
  private _sceneSize: Size;
  private _cellSize: Size;
  private _hexagonRadius: number;
  attackingHexes: HexAttack[];
  activeHex: Hexagon | null;

  get visibleScene(): Hexagon[] {
    return this._visibleScene;
  }

  get hexagonRadius(): number {
    return this._hexagonRadius;
  }

  get sceneSize(): Size {
    return this._sceneSize;
  }

  constructor() {
    this._scene = [];
    this._sceneSize = new Size(1920, 860);
    this._cellSize = new Size(Math.ceil(window.innerWidth / 10), Math.ceil(window.innerHeight / 5));
    this._sceneGrid = this._generateGrid(this._cellSize);
    this._visibleScene = [];
    this._hexagonRadius = 5;
    this.attackingHexes = [];
    this.activeHex = null;
    this._fillGrid();
  }

  resize(): void {
    this._cellSize = new Size(Math.ceil(window.innerWidth / 10), Math.ceil(window.innerHeight / 5));
    this._sceneGrid = this._generateGrid(this._cellSize);
    this._visibleScene = [];
    this._fillGrid();
  }

  private _generateRandomColor(): string {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    if (randomColor === Color.PURPLE) {
      return this._generateRandomColor();
    }

    return randomColor;
  }

  private _generateGrid(cellSize: Size): Grid {
    const grid: Grid = new Grid();
    const gridRowCount: number = Math.ceil(this._sceneSize.height / cellSize.height);
    const gridColumnCount: number = Math.ceil(this._sceneSize.width / cellSize.width);

    for (let row = 0; row < gridRowCount; row++) {
      grid.addRow([]);

      for (let column = 0; column < gridColumnCount; column++) {
        grid.addColumn(row, []);
      }
    }

    console.log(grid);

    return grid;
  }

  private _isHexInColumn(hexPosition: Vector, rowIndex: number, columnIndex: number): boolean {
    const startX: number = columnIndex * this._cellSize.width;
    const startY: number = rowIndex * this._cellSize.height;
    const endX: number = startX + this._cellSize.width;
    const endY: number = startY + this._cellSize.height;

    return hexPosition.x >= startX && hexPosition.x <= endX && hexPosition.y >= startY && hexPosition.y <= endY;
  }

  private _addHex(hexPosition: Vector, color: string, id: number): void {
    const hexagon = new Hexagon(hexPosition, color, id);

    this._scene.push(hexagon);

    for (let row = 0; row < this._sceneGrid.cells.length; row++) {
      for (let column = 0; column < this._sceneGrid.cells[row].length; column++) {
        if (this._isHexInColumn(hexPosition, row, column)) {
          this._sceneGrid.addHex(row, column, hexagon);

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
  }

  setAllOwnedHexagons(allOwnedHexagons: IGetResponseAllHexagonOwned[]): void {
    for (const owner of allOwnedHexagons) {
      const hexagonColor = this._generateRandomColor();

      for (const hexagons of Object.values(owner)) {
        for (const hexagonId of hexagons) {
          // this._sceneGrid.getHexagon(hexagonId).color = hexagonColor;
          this._scene[hexagonId].color = hexagonColor;
        }
      }
    }
  }

  updateScene(mapTransform: Matrix): void {
    const { x, y } = mapTransform.getTranslation();
    const { width: widthWindow, height: heightWindow } = Size.FromWindow();
    const cellSize = this._cellSize.multiplyByValue(mapTransform.getScaleFactor());
    // let notVisibleCells = 0;

    // HACK: test
    this._visibleScene = this._scene;

    return;

    this._visibleScene = [];

    // TODO: search can be optimized
    for (let row = 0; row < this._sceneGrid.cells.length; row++) {
      for (let column = 0; column < this._sceneGrid.cells[row].length; column++) {
        // FIXME: triggers when cells IS visible
        if (
          x + column * cellSize.width * 2 >= 0 &&
          x + column * cellSize.width <= widthWindow &&
          y + row * cellSize.height * 2 >= 0 &&
          y + row * cellSize.height <= heightWindow
        ) {
          this._visibleScene = this._visibleScene.concat(this._sceneGrid.cells[row][column]);
        } else {
          // HACK: just for test
          // notVisibleCells++;
        }
      }
    }

    // console.log(`visible: ${this._scene.cells.flat().length}; not visible: ${notVisibleCells}`);
  }
}
