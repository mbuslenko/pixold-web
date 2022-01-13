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
      this._updateSystem.makeScaleStep();
      this._updateSystem.makeMoveStep();

      const hexSize = this._updateSystem.adjustHexSize(this._sceneSystem.hexSize);

      for (const hex of this._sceneSystem.getVisibleCells(this._updateSystem.scaleFactor, this._updateSystem.offset)) {
        this._renderSystem.drawHex(this._updateSystem.adjustPosition(hex), hexSize);
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  scale (scaleFactor: number): void {
    this._updateSystem.scale(scaleFactor);
  }

  zoom (scaleFactor: number, mousePosition: Vector): void {
    this._updateSystem.zoom(mousePosition, scaleFactor);
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

  dragEnd (mousePosition: Vector): void {
    this._updateSystem.dragEnd(mousePosition);
  }

  click (position: Vector): void {
    // for (let i = 0; i < this._sceneSystem.scene.length; i++) {
    //   const hexPosition = this._sceneSystem.scene[i];

    //   if (this._updateSystem.positionInHex(position, hexPosition, this._sceneSystem.hexSize)) {
    //     this._sceneSystem.activeHexIndex = i;
    //   }
    // }
  }
}
