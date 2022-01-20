import { Vector } from './Vector';
import { SceneSystem } from './SceneSystem';
import { RenderSystem } from './RenderSystem';
import { Matrix } from './Matrix';
import { IGetResponseAllHexagonOwned } from '../../../shared/ts/interfaces';
import { Size } from './Size';
import { ScreenMaxWidth } from '../../../shared/ts/enums';

export class HexMap {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  private _sceneSystem: SceneSystem;
  private _renderSystem: RenderSystem;

  private _scaleFactor: number;
  private _mapTranslation: Matrix;
  private _mapScale: Matrix;
  private _mapTransform: Matrix;

  private _prevMousePosition: Vector;
  private _clickCallback: (hexagonId: number) => void;

  constructor(canvas: HTMLCanvasElement, clickCallback: (hexagonId: number) => void) {
    this._canvas = canvas;

    const ctx = this._canvas.getContext('2d');

    if (!ctx) {
      throw new Error('no ctx');
    }

    this._ctx = ctx;

    this._sceneSystem = new SceneSystem();
    this._renderSystem = new RenderSystem(this._ctx);

    this._prevMousePosition = new Vector(0, 0);
    this._scaleFactor = this._getInitialScaleFactor(this._sceneSystem.sceneSize);
    this._mapTranslation = Matrix.CreateIdentity();
    this._mapScale = Matrix.CreateIdentity();
    this._mapTransform = Matrix.CreateIdentity();

    this._clickCallback = clickCallback;
  }

  private _getInitialScaleFactor(sceneSize: Size): number {
    if (window.innerWidth >= ScreenMaxWidth.MEDIUM) {
      return -1 + window.innerWidth / sceneSize.width;
    }

    return -1 + window.innerHeight / sceneSize.height;
  }

  private _update(): void {
    const pivot = this._prevMousePosition
      .copy()
      .subtract(this._mapTransform.getTranslation())
      .divideByValue(this._mapTransform.getScaleFactor())
      .add(this._mapTranslation.getTranslation());

    const translation = Matrix.CreateTranslate(pivot);
    const translationInv = Matrix.CreateTranslate(pivot.multiplyByValue(-1));

    this._mapScale.multiply(translation.multiply(Matrix.CreateScale(1 + this._scaleFactor)).multiply(translationInv));

    // TODO: use to clamp mapScale
    // Math.min(2, Math.max(1, scale));

    this._mapTransform = this._mapScale.copy().multiply(this._mapTranslation);

    this._scaleFactor = 0;
  }

  run(): void {
    const animate = () => {
      this._renderSystem.clear(this._sceneSystem.sceneSize);
      this._renderSystem.setupForHex();

      this._update();
      this._sceneSystem.updateScene(this._mapTransform);
      this._renderSystem.setTransform(this._mapTransform);

      for (const hex of this._sceneSystem.visibleScene) {
        this._renderSystem.drawHex(hex, this._sceneSystem.hexagonRadius);
      }

      this._renderSystem.setupForActiveHex();

      if (this._sceneSystem.activeHex) {
        this._renderSystem.drawActiveHex(this._sceneSystem.activeHex, this._sceneSystem.hexagonRadius);
      }

      this._renderSystem.setupForLine();

      this._renderSystem.drawAttackLines (
        this._sceneSystem.leftAttackingHexagons,
        this._sceneSystem.rightAttackingHexagons,
      );

      // HACK: test
      this._ctx.strokeRect(0, 0, this._sceneSystem.sceneSize.width, this._sceneSystem.sceneSize.height);

      requestAnimationFrame(animate);
    };

    animate();
  }

  zoom(scaleFactor: number, position: Vector): void {
    this._scaleFactor = -Math.sign(scaleFactor) / 10;
    this._prevMousePosition = position;
  }

  setAllOwnedHexagons(allOwnedHexagons: IGetResponseAllHexagonOwned[]): void {
    this._sceneSystem.setAllOwnedHexagons(allOwnedHexagons);
  }

  move(offset: Vector): void {
    // const scaledSceneSize = this._sceneSystem.sceneSize.copy().scale(this._scaleFactor);
    // const windowEndPosition = Vector.FromWindowEndPosition();
    // const { x: xOffsetMax, y: yOffsetMax } = windowEndPosition.copy().subtractSize(scaledSceneSize).abs();
    // const x = offset.x + this._mapTransform.get([0, 2]);
    // const y = offset.y + this._mapTransform.get([1, 2]);

    // // TODO: need refactoring
    // if (x < -xOffsetMax) {
    //   offset.x -= (x + xOffsetMax) / this._scaleFactor;
    // } else if (x > 0) {
    //   offset.x -= x / this._scaleFactor;
    // }

    // if (y < -yOffsetMax) {
    //   offset.y -= (y + yOffsetMax) / this._scaleFactor;
    // } else if (y > 0) {
    //   offset.y -= y / this._scaleFactor;
    // }

    this._mapTranslation.multiply(Matrix.CreateTranslate(offset.divideByValue(this._mapTransform.getScaleFactor())));
  }

  dragStart(position: Vector): void {
    this._prevMousePosition = position;
  }

  dragMove(position: Vector): void {
    this.move(position.copy().subtract(this._prevMousePosition));
    this._prevMousePosition = position;
  }

  click(position: Vector): void {
    const { x, y } = position
      .subtract(this._mapTransform.getTranslation())
      .divideByValue(this._mapTransform.getScaleFactor());

    for (const hex of this._sceneSystem.visibleScene) {
      const { x: xHex, y: yHex } = hex.position;

      if (
        x >= xHex - this._sceneSystem.hexagonRadius &&
        x <= xHex + this._sceneSystem.hexagonRadius &&
        y >= yHex - this._sceneSystem.hexagonRadius &&
        y <= yHex + this._sceneSystem.hexagonRadius
      ) {
        this._sceneSystem.activeHex = hex;

        this._clickCallback(hex.id);

        return;
      }
    }

    this._sceneSystem.activeHex = null;
  }

  resize(): void {
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;

    this._sceneSystem.resize();

    this._scaleFactor = this._getInitialScaleFactor(this._sceneSystem.sceneSize);
    this._mapTranslation = Matrix.CreateIdentity();
    this._mapScale = Matrix.CreateIdentity();
    this._mapTransform = Matrix.CreateIdentity();
  }
}
