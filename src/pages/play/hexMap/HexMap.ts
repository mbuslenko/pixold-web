import { Vector } from './Vector';
import { Size } from './Size';
import { UpdateSystem } from './UpdateSystem';
import { SceneSystem } from './SceneSystem';
import { RenderSystem } from './RenderSystem';

export class HexMap {
  private _ctx: CanvasRenderingContext2D;
  private _sceneSystem: SceneSystem;
  private _updateSystem: UpdateSystem;
  private _renderSystem: RenderSystem;

  constructor (ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;

    this._sceneSystem = new SceneSystem();
    this._updateSystem = new UpdateSystem();
    this._renderSystem = new RenderSystem(this._ctx);

    // HACK: for test purposes
    for (const hex of this._sceneSystem.getVisibleHexes(this._updateSystem.scaleFactor, this._updateSystem.offset)) {
      this._renderSystem.drawHex(this._updateSystem.adjustPosition(hex), this._sceneSystem.hexSize);
    }
  }

  run (): void {
    const animate = () => {
      if (this._updateSystem.stopTransformAnimation) {
        requestAnimationFrame(animate);

        return;
      }

      this._renderSystem.clear();
      this._updateSystem.makeMoveStep();
      this._updateSystem.makeScaleStep();

      const hexSize = this._updateSystem.adjustHexSize(this._sceneSystem.hexSize);
      const visibleHex = this._sceneSystem.getVisibleHexes(this._updateSystem.scaleFactor, this._updateSystem.offset);

      for (const hex of visibleHex) {
        this._renderSystem.drawHex(this._updateSystem.adjustPosition(hex), hexSize);
      }

      // HACK: for test purposes
      if (this._sceneSystem.activeHex) {
        this._renderSystem.drawActiveHex(this._updateSystem.adjustPosition(this._sceneSystem.activeHex), hexSize, this._updateSystem.scaleFactor);
      }

      // HACK: for test purposes
      this._renderSystem.drawAttackLine(
        this._updateSystem.adjustPosition(visibleHex[0]),
        this._updateSystem.adjustPosition(visibleHex[visibleHex.length - 1]),
        this._updateSystem.scaleFactor
      );

      requestAnimationFrame(animate);
    };

    animate();
  }

  scale (scaleFactor: number): void {
    this._updateSystem.scale(scaleFactor);
  }

  zoom (scaleFactor: number, mousePosition: Vector): void {
    this._updateSystem.zoom(mousePosition, scaleFactor, this._sceneSystem.sceneCenter, this._sceneSystem.sceneSize);
  }

  move (offset: Vector): void {
    this._updateSystem.move(offset);
  }

  dragStart (mousePosition: Vector): void {
    this._updateSystem.dragStart(mousePosition);
  }

  dragMove (mousePosition: Vector): void {
    this._updateSystem.dragMove(mousePosition);
  }

  dragEnd (): void {
    this._updateSystem.dragEnd();
  }

  private _cursorInHex (cursorPosition: Vector, hexPosition: Vector, hesSize: Size): boolean {
    const { x, y } = cursorPosition;
    const { x: hexX, y: hexY } = this._updateSystem.adjustPosition(hexPosition);
    const { width: hexWidth, height: hexHeight } = this._updateSystem.adjustHexSize(hesSize);

    return (
      x >= hexX && x <= hexX + hexWidth &&
      y >= hexY && y <= hexY + hexHeight
    );
  }

  click (position: Vector): void {
    for (const hex of this._sceneSystem.getVisibleHexes(this._updateSystem.scaleFactor, this._updateSystem.offset)) {
      if (this._cursorInHex(position, hex, this._sceneSystem.hexSize)) {
        if (this._sceneSystem.activeHex) {
          this._renderSystem.clearActiveHex(
            this._updateSystem.adjustPosition(this._sceneSystem.activeHex),
            this._updateSystem.adjustHexSize(this._sceneSystem.hexSize),
            this._updateSystem.scaleFactor
          );

          this._renderSystem.drawHex(
            this._updateSystem.adjustPosition(this._sceneSystem.activeHex),
            this._updateSystem.adjustHexSize(this._sceneSystem.hexSize),
          );
        }
        this._sceneSystem.activeHex = hex;
        // HACK: after test need to change click draw logic
        this._renderSystem.drawActiveHex(
          this._updateSystem.adjustPosition(this._sceneSystem.activeHex),
          this._updateSystem.adjustHexSize(this._sceneSystem.hexSize),
          this._updateSystem.scaleFactor
        );

        return;
      }
    }
  }
}
