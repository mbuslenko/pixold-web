import { Size } from './Size';
import { Vector } from './Vector';

export class SceneSystem {
  scene: Vector[];
  activeHexIndex?: number;
  hexSize: Size;

  constructor () {
    this.scene = [];
    this.hexSize = new Size(0, 0);
  }

  generateMap (hexCount = 100, hexSize: Size): void {
    const { width, height } = hexSize;
    let xOffset = 0;
    let row = 0;

    this.scene = [];
    this.hexSize = hexSize;

    for (let i = 0; i < hexCount; i++) {
      let x = i * width - xOffset + i * width;

      if (x >= window.innerWidth) {
        xOffset += window.innerWidth;
        row++;
        x = i * width - xOffset + i * width;
      }

      const position = new Vector(
        x,
        row * height + row * height,
      );

      this.scene.push(position);
    }
  }
}
