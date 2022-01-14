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
  }

  run (): void {
    const animate = () => {
      if (this._updateSystem.stopAnimation) {
        requestAnimationFrame(animate);

        return;
      }

      this._renderSystem.drawSetup();
      this._updateSystem.makeMoveStep();
      this._updateSystem.makeScaleStep();

      const hexSize = this._updateSystem.adjustHexSize(this._sceneSystem.hexSize);

      for (const hex of this._sceneSystem.getVisibleCells(this._updateSystem.scaleFactor, this._updateSystem.offset)) {
        this._renderSystem.drawHex(this._updateSystem.adjustPosition(hex), hexSize);
      }

      if (this._sceneSystem.activeHex) {
        this._renderSystem.drawActiveHex(this._updateSystem.adjustPosition(this._sceneSystem.activeHex), hexSize, this._updateSystem.scaleFactor);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  scale (scaleFactor: number): void {
    this._updateSystem.scale(scaleFactor);
  }

  zoom (scaleFactor: number, mousePosition: Vector): void {
    this._updateSystem.zoom(mousePosition, scaleFactor, this._sceneSystem.sceneCenter);
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

  private _positionInHex (position: Vector, hexPosition: Vector, hesSize: Size): boolean {
    const { x, y } = this._updateSystem.adjustPosition(position);
    const { x: hexX, y: hexY } = this._updateSystem.adjustPosition(hexPosition);
    const { width: hexWidth, height: hexHeight } = this._updateSystem.adjustHexSize(hesSize);

    return (
      x >= hexX && x <= hexX + hexWidth &&
      y >= hexY && y <= hexY + hexHeight
    );
  }

  click (position: Vector): void {
    for (const hex of this._sceneSystem.getVisibleCells(this._updateSystem.scaleFactor, this._updateSystem.offset)) {
      if (this._positionInHex(position, hex, this._sceneSystem.hexSize)) {
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
