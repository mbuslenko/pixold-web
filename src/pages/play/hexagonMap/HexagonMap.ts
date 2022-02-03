import { clamp } from '../../../shared/ts/helperFunctions';
import {
  IGetResponseOwnedHexagonAll,
  ISocketMapMessage,
  ISocketNewHexagonMessage,
} from '../../../shared/ts/interfaces';
import { Color, ScreenMaxWidth } from '../../../shared/ts/enums';

import { Vector } from './Vector';
import { SceneSystem as MapSystem } from './MapSystem';
import { RenderSystem } from './RenderSystem';
import { Matrix } from './Matrix';
import { Size } from './Size';
import { Hexagon } from './Hexagon';

export class HexagonMap {
  private _canvasHexagon: HTMLCanvasElement;
  private _canvasLine: HTMLCanvasElement;
  private _contextHexagon: CanvasRenderingContext2D;
  private _contextLine: CanvasRenderingContext2D;

  private _mapSystem: MapSystem;
  private _renderSystem: RenderSystem;

  private _prevMousePosition: Vector;
  private _scaleFactor: number;
  private _mapTranslation: Matrix;
  private _mapScale: Matrix;
  private _mapTransform: Matrix;

  private _requestAnimationFrameId: number;

  // HACK: test
  private _attackLine: { from: Vector; to: Vector; color: string };

  clickOnHexagonCallback?: (hexagonId: number) => void;
  private _clickOutsideHexagonCallback: () => void;
  private _updateHexagonMap: () => void;
  private _sleepHexagonSceneCallback: () => void;

  constructor(
    canvasHexagon: HTMLCanvasElement,
    canvasLine: HTMLCanvasElement,
    clickOutsideHexagonCallback: () => void,
  ) {
    this._canvasHexagon = canvasHexagon;
    this._canvasLine = canvasLine;

    const contextHexagon = this._canvasHexagon.getContext('2d');
    const contextLine = this._canvasLine.getContext('2d');

    if (!contextHexagon || !contextLine) {
      throw new Error('no ctx');
    }

    this._setCanvasSizeAll();

    this._contextHexagon = contextHexagon;
    this._contextLine = contextLine;

    this._mapSystem = new MapSystem();
    this._renderSystem = new RenderSystem(this._contextHexagon, this._contextLine, this._mapSystem.map);

    this._prevMousePosition = new Vector(0, 0);
    this._scaleFactor = this._getNewInitialScaleFactor(this._mapSystem.mapSize);
    this._mapTranslation = Matrix.CreateIdentity();
    this._mapScale = Matrix.CreateIdentity();
    this._mapTransform = Matrix.CreateIdentity();

    this._requestAnimationFrameId = 0;

    this._clickOutsideHexagonCallback = clickOutsideHexagonCallback;
    this._sleepHexagonSceneCallback = () => {
      // I made empty function to eliminate if() in each frame inside of animate()
    };
    this._updateHexagonMap = this._updateHexagonMapCallback;

    this._updateMapTransform();
    this._centerMap();

    this._attackLine = {
      from: new Vector(0, 0),
      to: new Vector(0, 0),
      color: Color.PINK,
    };
  }

  private _setCanvasSizeAll(): void {
    this._canvasHexagon.width = window.innerWidth;
    this._canvasHexagon.height = window.innerHeight;
    this._canvasLine.width = window.innerWidth;
    this._canvasLine.height = window.innerHeight;
  }

  private _centerMap(): void {
    this.move(
      Vector.FromWindowEndPosition()
        .subtractSize(this._mapSystem.mapSize.copy().multiplyByValue(this._mapTransform.getScale()))
        .divideByValue(2),
    );
  }

  resize(): void {
    this._setCanvasSizeAll();

    this._mapSystem.resize();
    this._renderSystem.resize();

    this._prevMousePosition = new Vector(0, 0);
    this._scaleFactor = this._getNewInitialScaleFactor(this._mapSystem.mapSize);
    this._mapTranslation = Matrix.CreateIdentity();
    this._mapScale = Matrix.CreateIdentity();
    this._mapTransform = Matrix.CreateIdentity();

    this._updateMapTransform();
    this._centerMap();
  }

  private _getNewInitialScaleFactor(sceneSize: Size): number {
    if (window.innerWidth >= ScreenMaxWidth.MEDIUM) {
      return -1 + window.innerWidth / sceneSize.width;
    }

    return -1 + window.innerHeight / sceneSize.height;
  }

  private _updateMapTransform(): void {
    const pivot = this._prevMousePosition
      .copy()
      .subtract(this._mapTransform.getTranslation())
      .divideByValue(this._mapTransform.getScale())
      .add(this._mapTranslation.getTranslation());

    const translation = Matrix.CreateTranslate(pivot);
    const translationInv = Matrix.CreateTranslate(pivot.multiplyByValue(-1));

    this._mapScale.multiply(translation.multiply(Matrix.CreateScale(1 + this._scaleFactor)).multiply(translationInv));
    this._mapTransform = this._mapScale.copy().multiply(this._mapTranslation);

    this._scaleFactor = 0;

    this._mapSystem.setTransformHexagonAll(this._mapTransform);
    this._renderSystem.setTransformHexagonAll(this._mapTransform);
    this._renderSystem.setTransformLineAll(this._mapTransform);
  }

  private _updateHexagonMapCallback(): void {
    this._renderSystem.clearHexagonAll(this._mapSystem.mapSize);

    this._updateMapTransform();

    this._renderSystem.drawHexagonAll(this._mapSystem.visibleMap);
    this._renderSystem.drawActiveHexagonAll(this._mapSystem.activeHexagon);
  }

  private _updateActiveHexagonCallback(): () => void {
    // private _updateActiveHexagonCallback(notActiveHexagonAll: Hexagon[]): () => void {
    return () => {
      // HACK: test
      // for (const hexagon of notActiveHexagonAll) {
      //   this._renderSystem.clearActiveHexagon(hexagon);
      // }

      this._renderSystem.clearHexagonAll(this._mapSystem.mapSize);
      this._renderSystem.drawHexagonAll(this._mapSystem.visibleMap);
      this._renderSystem.drawActiveHexagonAll(this._mapSystem.activeHexagon);
    };
  }

  run(): void {
    const animate = () => {
      this._renderSystem.clearLineAll(this._mapSystem.mapSize);

      this._updateHexagonMap();

      this._renderSystem.drawHexagonAttackAll(
        this._mapSystem.leftAttackingHexagonAll,
        this._mapSystem.rightAttackingHexagonAll,
      );

      this._renderSystem.drawActiveAttackLine(this._attackLine);

      this._updateHexagonMap = this._sleepHexagonSceneCallback;

      this._requestAnimationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  stop(): void {
    cancelAnimationFrame(this._requestAnimationFrameId);
  }

  zoom(scaleFactor: number, position: Vector): void {
    this._scaleFactor = clamp(
      -Math.sign(scaleFactor) / 10,
      0.25 / this._mapScale.getScale() - 1,
      10 / this._mapScale.getScale() - 1,
    );
    this._prevMousePosition = position;

    this._updateHexagonMap = this._updateHexagonMapCallback;
  }

  setAllOwnedHexagons(ownedHexagonAll: IGetResponseOwnedHexagonAll): void {
    this._mapSystem.setOwnedHexagonAll(ownedHexagonAll);

    for (const attack of ownedHexagonAll.attacks) {
      // HACK: test
      this._mapSystem.addAttackingHexagon({
        defender: this._mapSystem.map[attack.attackedId],
        attacker: this._mapSystem.map[attack.attackerId],
      });
    }

    this._updateHexagonMap = this._updateHexagonMapCallback;
  }

  addOwnedHexagon(eventMessage: ISocketNewHexagonMessage): void {
    this._mapSystem.addOwnedHexagon(eventMessage);

    this._updateHexagonMap = this._updateHexagonMapCallback;
  }

  updateHexagonAttack(attack: ISocketMapMessage): void {
    this._mapSystem.updateHexagonAttack(attack);
  }

  move(offset: Vector): void {
    const { width: windowWidth, height: windowHeight } = Size.FromWindow();
    const { width: mapWidth, height: mapHeight } = this._mapSystem.mapSize
      .copy()
      .multiplyByValue(this._mapTransform.getScale());
    const { x, y } = this._mapTransform.getTranslation();

    offset.divideByValue(this._mapTransform.getScale());

    if (window.innerWidth >= ScreenMaxWidth.MEDIUM) {
      offset.x = clamp(offset.x, -x - mapWidth, windowWidth - x);
      offset.y = clamp(offset.y, -y - mapHeight, windowHeight - y);
    } else {
      offset.x = clamp(offset.x, -mapWidth - x, windowWidth - x);
      offset.y = clamp(offset.y, -mapHeight - y, windowHeight - y);
    }

    this._mapTranslation.multiply(Matrix.CreateTranslate(offset));

    this._updateHexagonMap = this._updateHexagonMapCallback;
  }

  dragStart(position: Vector): void {
    this._prevMousePosition = position;
  }

  dragMove(position: Vector): void {
    this.move(position.copy().subtract(this._prevMousePosition));
    this._prevMousePosition = position;
  }

  private _isPositionInHexagon(position: Vector, hexagon: Hexagon): boolean {
    const { x, y } = position;
    const { x: xHexagon, y: yHexagon } = hexagon.position;

    return (
      x >= xHexagon - Hexagon.radius &&
      x <= xHexagon + Hexagon.radius &&
      y >= yHexagon - Hexagon.radius &&
      y <= yHexagon + Hexagon.radius
    );
  }

  showOwnedHexagonAll(): void {
    // TODO: refactoring
    // this._updateHexagonMap = this._updateActiveHexagonCallback(this._mapSystem.activeHexagon);
    this._updateHexagonMap = this._updateActiveHexagonCallback();

    this._mapSystem.activeHexagon = this._mapSystem.ownedHexagonAll;
  }

  drawAttackLine(position: Vector): void {
    this._attackLine = {
      from: this._mapSystem.activeHexagon[0].position,
      to: position.subtract(this._mapTransform.getTranslation()).divideByValue(this._mapTransform.getScale()),
      color: this._mapSystem.activeHexagon[0].color,
    };
  }

  click(position: Vector): void {
    position.subtract(this._mapTransform.getTranslation()).divideByValue(this._mapTransform.getScale());

    // TODO: i can set updateCallback only on change
    // this._updateHexagonMap = this._updateActiveHexagonCallback([...this._mapSystem.activeHexagon]);
    this._updateHexagonMap = this._updateActiveHexagonCallback();

    for (const hexagon of this._mapSystem.visibleMap) {
      if (this._isPositionInHexagon(position, hexagon)) {
        this._mapSystem.activeHexagon = [hexagon];

        if (this.clickOnHexagonCallback) {
          this.clickOnHexagonCallback(hexagon.id);
        }
        console.log(`owned: ${hexagon.color}; not owned: rgb(96, 74, 247)`);

        return;
      }
    }

    this._mapSystem.removeActiveHexagon();
    this._clickOutsideHexagonCallback();
    this.hideAttackLine();
  }

  hideAttackLine(): void {
    this._attackLine = {
      from: new Vector(0, 0),
      to: new Vector(0, 0),
      color: Color.PINK,
    };
  }
}
