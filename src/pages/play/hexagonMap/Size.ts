export class Size {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  multiplyByValue(value: number): Size {
    this.width *= value;
    this.height *= value;

    return this;
  }

  copy(): Size {
    return new Size(this.width, this.height);
  }

  static FromWindow(): Size {
    return new Size(window.innerWidth, window.innerHeight);
  }
}
