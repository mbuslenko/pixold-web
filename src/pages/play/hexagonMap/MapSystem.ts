import { Color } from '../../../shared/ts/enums';
import { clamp } from '../../../shared/ts/helperFunctions';
import { IGetResponseOwnedHexagonAll } from '../../../shared/ts/interfaces';

import { Grid } from './Grid';
import { Hexagon } from './Hexagon';
import { HexagonAttack } from './interfaces';
import { mapData } from './mapData';
import { Matrix } from './Matrix';
import { Size } from './Size';
import { Vector } from './Vector';

export class SceneSystem {
  private _map: Hexagon[];
  private _mapSize: Size;
  private _gridCellSize: Size;
  private _mapGrid: Grid;
  private _visibleMap: Hexagon[];

  private _leftAttackingHexagonAll: HexagonAttack[];
  private _rightAttackingHexagonAll: HexagonAttack[];

  private _ownedHexagonAll: Hexagon[];
  private _invisibleActiveHexagon: Hexagon;
  activeHexagon: Hexagon[];

  get map(): Hexagon[] {
    return this._map;
  }

  get visibleMap(): Hexagon[] {
    return this._visibleMap;
  }

  get ownedHexagonAll(): Hexagon[] {
    return this._ownedHexagonAll;
  }

  get mapSize(): Size {
    return this._mapSize;
  }

  get leftAttackingHexagonAll(): HexagonAttack[] {
    return this._leftAttackingHexagonAll;
  }

  get rightAttackingHexagonAll(): HexagonAttack[] {
    return this._rightAttackingHexagonAll;
  }

  constructor() {
    this._map = [];
    this._mapSize = new Size(1920, 860);
    this._gridCellSize = this._getNewGridCellSize();
    this._mapGrid = this._getNewGrid(this._gridCellSize);
    this._visibleMap = [];

    this._leftAttackingHexagonAll = [];
    this._rightAttackingHexagonAll = [];

    Hexagon.radius = 5;

    this._setSceneData();

    this._ownedHexagonAll = [];
    // I made _invisibleActiveHexagon to eliminate if() in each frame inside of HexagonMap animate()
    this._invisibleActiveHexagon = new Hexagon(
      new Vector(-(this._mapSize.width / 0.25) - Hexagon.radius * 2, 0),
      Color.PINK,
      this._map.length,
    );
    this.activeHexagon = [this._invisibleActiveHexagon];
    this._map.push(this._invisibleActiveHexagon);
  }

  private _getNewGridCellSize(): Size {
    return new Size(
      clamp(Math.ceil(window.innerWidth / 10), 120, 200),
      clamp(Math.ceil(window.innerHeight / 5), 100, 200),
    );
  }

  private _getNewGrid(cellSize: Size): Grid {
    const grid: Grid = new Grid();
    const gridRowCount: number = Math.ceil(this._mapSize.height / cellSize.height);
    const gridColumnCount: number = Math.ceil(this._mapSize.width / cellSize.width);

    for (let row = 0; row < gridRowCount; row++) {
      grid.addRow([]);

      for (let column = 0; column < gridColumnCount; column++) {
        grid.addColumn(row, []);
      }
    }

    return grid;
  }

  private _addHexagonToGrid(hexagon: Hexagon): void {
    const row = Math.floor(hexagon.position.y / this._gridCellSize.height);
    const column = Math.floor(hexagon.position.x / this._gridCellSize.width);

    this._mapGrid.value[row][column].push(hexagon);
  }

  private _setSceneData(): void {
    let hexagonIndex = 0;

    for (const hexagonData of mapData) {
      const hexagon = new Hexagon(Vector.FromHexagonData(hexagonData), Color.PURPLE, hexagonIndex++);

      this._map.push(hexagon);

      this._addHexagonToGrid(hexagon);
    }
  }

  resize(): void {
    this._gridCellSize = this._getNewGridCellSize();
    this._mapGrid = this._getNewGrid(this._gridCellSize);
    this._visibleMap = [];

    // add slice(0, -1) because on map last index is invisibleActiveHexagon
    for (const hexagon of this._map.slice(0, -1)) {
      this._addHexagonToGrid(hexagon);
    }
  }

  removeActiveHexagon(): void {
    this.activeHexagon = [this._invisibleActiveHexagon];
  }

  private _addAttackingHexagon(attackingHexagon: HexagonAttack): void {
    const { attacker, defender } = attackingHexagon;

    if (attacker.position <= defender.position) {
      this._leftAttackingHexagonAll.push(attackingHexagon);

      return;
    }

    this._rightAttackingHexagonAll.push(attackingHexagon);
  }

  private _generateRandomColor(): string {
    // TODO: make better randomizing algorithm
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    if (randomColor === Color.PURPLE) {
      return this._generateRandomColor();
    }

    return randomColor;
  }

  setOwnedHexagonAll(ownedHexagonAll: IGetResponseOwnedHexagonAll[]): void {
    this._ownedHexagonAll = [];

    for (const { username, numericIds: hexagonIdAll } of ownedHexagonAll) {
      // TODO: refactoring;
      if (username === localStorage.username) {
        for (const hexagonId of hexagonIdAll) {
          this._ownedHexagonAll.push(this._map[hexagonId]);
        }
      }

      const hexagonColor = this._generateRandomColor();

      for (const hexagonId of hexagonIdAll) {
        this._map[hexagonId].color = hexagonColor;
      }
    }
  }

  setTransformHexagonAll(mapTransform: Matrix): void {
    const { x, y } = mapTransform.getTranslation();
    const { width: widthWindow, height: heightWindow } = Size.FromWindow();
    const gridCellSize = this._gridCellSize.copy().multiplyByValue(mapTransform.getScale());

    const startRow = Math.max(Math.floor(-y / gridCellSize.height - 1), 0);
    const startColumn = Math.max(Math.floor(-x / gridCellSize.width - 1), 0);

    const endRow = Math.min(Math.floor((heightWindow - y) / gridCellSize.height + 1), this._mapGrid.rowCount - 1);
    const endColumn = Math.min(Math.floor((widthWindow - x) / gridCellSize.width + 1), this._mapGrid.columnCount - 1);

    this._visibleMap = [];

    for (let row = startRow; row <= endRow; row++) {
      for (let column = startColumn; column <= endColumn; column++) {
        this._visibleMap = this._visibleMap.concat(this._mapGrid.value[row][column]);
      }
    }
  }
}
