import { Vector } from './Vector';
import { SceneSystem } from './SceneSystem';
import { RenderSystem } from './RenderSystem';
import { Matrix } from './Matrix';

export class HexMap {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  private _sceneSystem: SceneSystem;
  private _renderSystem: RenderSystem;

  private _scaleFactor: number;
  private _mapOrigin: Vector;
  private _mapTranslation: Matrix;
  private _mapScale: Matrix;
  private _mapTransform: Matrix;

  private _prevMousePosition: Vector;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;

    const ctx = this._canvas.getContext('2d');

    if (!ctx) {
      throw new Error('no ctx');
    }

    this._ctx = ctx;

    this._sceneSystem = new SceneSystem();
    this._renderSystem = new RenderSystem(this._ctx);

    this._scaleFactor = 0;
    this._mapOrigin = new Vector(0, 0);
    this._mapTranslation = Matrix.CreateIdentity();
    this._mapScale = Matrix.CreateIdentity();
    this._mapTransform = Matrix.CreateIdentity();

    this._prevMousePosition = new Vector(0, 0);
  }

  private _update(): void {
    // TODO: doesn't work after changing pivot
    const pivot = this._prevMousePosition.copy().subtract(this._mapOrigin);
    const translation = Matrix.CreateTranslate(pivot);
    const translationInv = Matrix.CreateTranslate(pivot.multiplyByValue(-1));

    this._mapScale.multiply(translation.multiply(Matrix.CreateScale(1 + this._scaleFactor)).multiply(translationInv));

    // TODO: use to clamp mapScale
    // Math.min(2, Math.max(1, this._mapScale.getScaleFactor() * (1 + this._scaleFactor)));

    this._mapTransform = this._mapScale.copy().multiply(this._mapTranslation);

    this._scaleFactor = 0;
  }

  run(): void {
    const animate = () => {
      this._renderSystem.clear();
      this._renderSystem.setupForHex();

      this._update();
      this._sceneSystem.updateScene(this._mapTransform);
      this._renderSystem.setTransform(this._mapTransform);

      for (const hex of this._sceneSystem.visibleScene) {
        this._renderSystem.drawHex(hex, this._sceneSystem.hexSize);
      }

      this._renderSystem.setupForActiveHex();

      if (this._sceneSystem.activeHex) {
        this._renderSystem.drawActiveHex(this._sceneSystem.activeHex, this._sceneSystem.hexSize);
      }

      this._renderSystem.setupForLine();

      for (const { attacker, defender } of this._sceneSystem.attackingHexes) {
        this._renderSystem.drawAttackLine(attacker, defender);
      }

      // HACK: test
      this._ctx.strokeRect(0, 0, window.innerWidth, window.innerHeight);

      this._ctx.lineDashOffset -= 2 % 4;

      requestAnimationFrame(animate);
    };

    animate();
  }

  zoom(scaleFactor: number, position: Vector): void {
    this._scaleFactor = -Math.sign(scaleFactor) / 10;
    this._prevMousePosition = position;
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

    this._mapOrigin.add(offset);
    this._mapTranslation.multiply(Matrix.CreateTranslate(offset));
  }

  dragStart(mousePosition: Vector): void {
    this._prevMousePosition = mousePosition;
  }

  dragMove(position: Vector): void {
    this.move(position.copy().subtract(this._prevMousePosition));
    this._prevMousePosition = position;
  }

  click(position: Vector): void {
    const { width: hexWidth, height: hexHeight } = this._sceneSystem.hexSize;
    const { x, y } = position
      .subtract(this._mapTransform.getTranslation())
      .divideByValue(this._mapTransform.getScaleFactor());

    for (const hex of this._sceneSystem.visibleScene) {
      const { x: xHex, y: yHex } = hex;

      if (x >= xHex && x <= xHex + hexWidth && y >= yHex && y <= yHex + hexHeight) {
        // if (y < -Math.sqrt(3) * xHex - y + Math.sqrt(3) / 2) {
        this._sceneSystem.activeHex = hex;

        return;
      }
    }

    this._sceneSystem.activeHex = null;
  }
}
