import { Color } from '../../../shared/ts/enums';
import { clamp } from '../../../shared/ts/helperFunctions';
import {
  IGetResponseOwnedHexagonAll,
  ISocketMapMessage,
  ISocketNewHexagonMessage,
} from '../../../shared/ts/interfaces';

import { Grid } from './Grid';
import { Hexagon } from './Hexagon';
import { IHexagonAttack } from './interfaces';
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

  private _leftAttackingHexagonAll: IHexagonAttack[];
  private _rightAttackingHexagonAll: IHexagonAttack[];

  private _ownedHexagonAll: Map<string, Hexagon[]>;
  private _invisibleHexagon: Hexagon;
  activeHexagon: Hexagon[];

  get map(): Hexagon[] {
    return this._map;
  }

  get visibleMap(): Hexagon[] {
    return this._visibleMap;
  }

  get mapSize(): Size {
    return this._mapSize;
  }

  get leftAttackingHexagonAll(): IHexagonAttack[] {
    return this._leftAttackingHexagonAll;
  }

  get rightAttackingHexagonAll(): IHexagonAttack[] {
    return this._rightAttackingHexagonAll;
  }

  constructor() {
    Hexagon.radius = 5;
    this._mapSize = new Size(1920, 860);

    // I do this because on backend all hexagons start from 1 index
    this._invisibleHexagon = new Hexagon(new Vector(-(this.mapSize.width * 4), 0), Color.BLACK, 0);

    this._map = [this._invisibleHexagon];
    this._gridCellSize = this._getNewGridCellSize();
    this._mapGrid = this._getNewGrid(this._gridCellSize);
    this._visibleMap = [];

    this._leftAttackingHexagonAll = [];
    this._rightAttackingHexagonAll = [];

    this._ownedHexagonAll = new Map();

    this.activeHexagon = [];

    this._setSceneData();
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
    // I do this because on backend all hexagons start from 1 index
    let hexagonIndex = 1;

    for (const hexagonData of mapData) {
      const hexagon = new Hexagon(Vector.FromHexagonData(hexagonData), Color.PURPLE, hexagonIndex++);

      this._map.push(hexagon);

      this._addHexagonToGrid(hexagon);
    }
  }

  private _generateRandomColor(): string {
    const generateRgbValue = (avoidValue: number): number => {
      const colorRange = 10;
      // 255 - colorRange is to eliminate full black colors
      const value = Math.floor(Math.random() * (255 - colorRange * 2)) + colorRange;

      if (Math.abs(value - avoidValue) <= colorRange) {
        return (
          avoidValue + (Math.ceil(Math.random() * colorRange) + colorRange) * Math.sign((value - avoidValue) * -2 + 1)
        );
      }

      return value;
    };

    // rgb to avoid "rgb(96, 74, 247)"
    return `rgb(${generateRgbValue(96)}, ${generateRgbValue(74)}, ${generateRgbValue(247)})`;
  }

  getOwnedHexagonAll(username: string): Hexagon[] {
    const ownedHexagonAll = this._ownedHexagonAll.get(username);

    if (!ownedHexagonAll) {
      return [];
    }

    return [...ownedHexagonAll].flat();
  }

  resize(): void {
    this._gridCellSize = this._getNewGridCellSize();
    this._mapGrid = this._getNewGrid(this._gridCellSize);
    this._visibleMap = [];

    // I do this because on 0 index is invisibleHexagon
    for (const hexagon of this._map.slice(1)) {
      this._addHexagonToGrid(hexagon);
    }
  }

  addAttackingHexagon(attackingHexagon: IHexagonAttack): void {
    const { attacker, defender } = attackingHexagon;

    if (attacker.position.x > defender.position.x || attacker.position.y > defender.position.y) {
      this._leftAttackingHexagonAll.push(attackingHexagon);

      return;
    }

    this._rightAttackingHexagonAll.push(attackingHexagon);
  }

  updateHexagonAttack(attackMessage: ISocketMapMessage): void {
    if (attackMessage.attack === 'started') {
      this.addAttackingHexagon({
        attacker: this._map[attackMessage.from],
        defender: this._map[attackMessage.to],
      });

      return;
    }

    let hexagonAttack = this._leftAttackingHexagonAll.find(
      ({ attacker, defender }) => attacker.id === attackMessage.from && defender.id === attackMessage.to,
    );

    if (hexagonAttack) {
      this._leftAttackingHexagonAll.splice(this._leftAttackingHexagonAll.indexOf(hexagonAttack), 1);

      return;
    }

    hexagonAttack = this._rightAttackingHexagonAll.find(
      ({ attacker, defender }) => attacker.id === attackMessage.from && defender.id === attackMessage.to,
    );

    if (hexagonAttack) {
      this._rightAttackingHexagonAll.splice(this._leftAttackingHexagonAll.indexOf(hexagonAttack), 1);
    }
  }

  setOwnedHexagonAll(ownedHexagonAll: IGetResponseOwnedHexagonAll): void {
    this._ownedHexagonAll = new Map();

    for (const { username, numericIds: hexagonIdAll } of ownedHexagonAll.hexagons) {
      const hexagonAll: Hexagon[] = [];
      const hexagonColor = this._generateRandomColor();

      this._ownedHexagonAll.set(username, hexagonAll);

      for (const hexagonId of hexagonIdAll) {
        const hexagon = this._map[hexagonId];

        hexagon.color = hexagonColor;

        hexagonAll.push(hexagon);
      }
    }
  }

  addOwnedHexagon(eventMessage: ISocketNewHexagonMessage): void {
    const { username, numericId } = eventMessage;
    const newOwnedHexagon = this._map[numericId];
    const ownedHexagonAll = this._ownedHexagonAll.get(username);

    if (ownedHexagonAll) {
      newOwnedHexagon.color = ownedHexagonAll[0].color;
      ownedHexagonAll.push(newOwnedHexagon);

      return;
    }

    newOwnedHexagon.color = this._generateRandomColor();
    this._ownedHexagonAll.set(username, [newOwnedHexagon]);
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
