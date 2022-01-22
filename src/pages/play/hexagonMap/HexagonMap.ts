import { clamp } from '../../../shared/ts/helperFunctions';
import { IGetResponseOwnedHexagonAll } from '../../../shared/ts/interfaces';
import { ScreenMaxWidth } from '../../../shared/ts/enums';

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

  private _clickOnHexagonCallback: (hexagonId: number) => void;
  private _updateHexagonMap: () => void;
  private _sleepHexagonSceneCallback: () => void;

  constructor(
    canvasHexagon: HTMLCanvasElement,
    canvasLine: HTMLCanvasElement,
    clickOnHexagonCallback: (hexagonId: number) => void,
  ) {
    this._canvasHexagon = canvasHexagon;
    this._canvasLine = canvasLine;

    const ctxHexagon = this._canvasHexagon.getContext('2d');
    const ctxLine = this._canvasLine.getContext('2d');

    if (!ctxHexagon || !ctxLine) {
      throw new Error('no ctx');
    }

    this._setCanvasSizeAll();

    this._contextHexagon = ctxHexagon;
    this._contextLine = ctxLine;

    this._mapSystem = new MapSystem();
    this._renderSystem = new RenderSystem(this._contextHexagon, this._contextLine, this._mapSystem.map);

    this._prevMousePosition = new Vector(0, 0);
    this._scaleFactor = this._getNewInitialScaleFactor(this._mapSystem.mapSize);
    this._mapTranslation = Matrix.CreateIdentity();
    this._mapScale = Matrix.CreateIdentity();
    this._mapTransform = Matrix.CreateIdentity();

    this._requestAnimationFrameId = 0;

    this._clickOnHexagonCallback = clickOnHexagonCallback;
    this._sleepHexagonSceneCallback = () => {
      // I made empty function to eliminate if() in each frame inside of animate()
    };
    this._updateHexagonMap = this._updateHexagonMapCallback;

    this._centerMap();
  }

  private _setCanvasSizeAll(): void {
    this._canvasHexagon.width = window.innerWidth;
    this._canvasHexagon.height = window.innerHeight;
    this._canvasLine.width = window.innerWidth;
    this._canvasLine.height = window.innerHeight;
  }

  private _centerMap(): void {
    const scaleValue = 1 + this._scaleFactor;

    this.move(
      Vector.FromWindowEndPosition()
        .subtractSize(this._mapSystem.mapSize.copy().multiplyByValue(scaleValue))
        .divideByValue(2),
    );
  }

  resize(): void {
    this._setCanvasSizeAll();

    this._mapSystem.resize();
    this._renderSystem.resize();

    this._scaleFactor = this._getNewInitialScaleFactor(this._mapSystem.mapSize);
    this._mapTranslation = Matrix.CreateIdentity();
    this._mapScale = Matrix.CreateIdentity();
    this._mapTransform = Matrix.CreateIdentity();

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
      .divideByValue(this._mapTransform.getScaleFactor())
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
    this._renderSystem.drawActiveHexagon(this._mapSystem.activeHexagon);
  }

  run(): void {
    const animate = () => {
      this._renderSystem.clearLineAll(this._mapSystem.mapSize);

      this._updateHexagonMap();

      this._renderSystem.drawHexagonAttackAll(
        this._mapSystem.leftAttackingHexagonAll,
        this._mapSystem.rightAttackingHexagonAll,
      );

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
      0.5 / this._mapScale.getScaleFactor() - 1,
      10 / this._mapScale.getScaleFactor() - 1,
    );
    this._prevMousePosition = position;

    this._updateHexagonMap = this._updateHexagonMapCallback;
  }

  setAllOwnedHexagons(ownedHexagonAll: IGetResponseOwnedHexagonAll[]): void {
    this._mapSystem.setOwnedHexagonAll(ownedHexagonAll);
  }

  move(offset: Vector): void {
    const { width: windowWidth, height: windowHeight } = Size.FromWindow();
    const { x, y } = this._mapTransform.getTranslation();

    offset.x = clamp(offset.x, -windowWidth - x, windowWidth - x);
    offset.y = clamp(offset.y, -windowHeight - y, windowHeight - y);

    this._mapTranslation.multiply(Matrix.CreateTranslate(offset.divideByValue(this._mapTransform.getScaleFactor())));

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

  click(position: Vector): void {
    position.subtract(this._mapTransform.getTranslation()).divideByValue(this._mapTransform.getScaleFactor());

    this._updateHexagonMap = this._updateHexagonMapCallback;

    for (const hexagon of this._mapSystem.visibleMap) {
      if (this._isPositionInHexagon(position, hexagon)) {
        this._mapSystem.activeHexagon = hexagon;

        this._clickOnHexagonCallback(hexagon.id + 1);

        return;
      }
    }

    this._mapSystem.removeActiveHexagon();
  }
}
