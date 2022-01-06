// import { geoNaturalEarth1, geoPath } from 'd3-geo';
// import topojson from 'topojson';

import { matrix, Complex, complex, add, Matrix, subtract, identity, multiply } from 'mathjs';

export interface IPosition {
  x: number;
  y: number;
}

export interface IHexSize {
  width: number;
  height: number;
}

export class HexMap {
  private _ctx: CanvasRenderingContext2D;
  private _map: IPosition[];
  private _hexSize: IHexSize;
  private _scaleFactor: number;
  private _scaleVelocity: number;
  private _xOffset: number;
  private _yOffset: number;
  private _xFinal: number;
  private _yFinal: number;
  private _offsetVelocity: number;
  private _animate: boolean;
  private _mapOrigin: Complex;
  private _prevMouseState: Complex;
  private _mapTranslation: Matrix;
  private _mapScale: Matrix;

  constructor (ctx: CanvasRenderingContext2D) {
    this._ctx = ctx;
    this._map = [];
    this._hexSize = { width: 12, height: 12 };
    this._scaleFactor = 1;
    this._scaleVelocity = 0.15;
    this._xOffset = 0;
    this._yOffset = 0;
    this._xFinal = 0;
    this._yFinal = 0;
    this._offsetVelocity = 0.15;
    this._animate = false;
    this._mapOrigin = complex(0, 0);
    this._prevMouseState = complex(0, 0);
    this._mapTranslation = identity(3) as Matrix;
    this._mapScale = identity(3) as Matrix;
  }

  init (): void {
    this._ctx.lineWidth = 2;
    this._ctx.strokeStyle = 'blue';
    this._ctx.fillStyle = 'grey';
  }

  generateMap (hexCount = 100): void {
    const { width, height } = this._hexSize;
    let xOffset = 0;
    let row = 0;

    this._map = [];

    for (let i = 0; i < hexCount; i++) {
      let x = i * width - xOffset + i * width;

      if (x >= window.innerWidth) {
        xOffset += window.innerWidth;
        row++;
        x = i * width - xOffset + i * width;
      }

      const y = row * height + row * height;

      this._map.push({ x, y });
    }
  }

  private _drawHex (context: CanvasRenderingContext2D, x: number, y: number, r: number): void {
    context.moveTo(x, y - r);
    for (let a = 1; a < 6; ++a) {
      const angle = a * Math.PI / 3;

      context.lineTo(x + Math.sin(angle) * r, y - Math.cos(angle) * r);
    }
    context.closePath();
  }

  mouseDrag (mousePosition: Complex): void {
    const diff = subtract(mousePosition, this._prevMouseState) as Complex;

    this._mapOrigin = add(this._mapOrigin, diff) as Complex;
    // diff is Vector2 not Vector3
    this._mapTranslation = multiply(this._mapTranslation, diff);

    //     var diff = mouseState.Position.ToVector2() - prevMouseState.Position.ToVector2();
    //     mapOrigin += diff;

    //     mapTranslation *= Matrix.CreateTranslation(new Vector3(diff, 0));
  }

  scale (scaleFactor: number, mousePosition: Complex): void {
    // const pivot = add(mousePosition, this._mapOrigin);
    // this._mapScale = multiply(this._mapScale, );

    // var wheelValue = Math.Sign(mouseState.ScrollWheelValue - prevMouseState.ScrollWheelValue) / 50.0f;

    // var pivot = mouseState.Position.ToVector2() - mapOrigin;

    // var T = Matrix.CreateTranslation(-new Vector3(pivot, 0));
    // var Tinv = Matrix.CreateTranslation(new Vector3(pivot, 0));

    // mapScale *= T * Matrix.CreateScale(1.0f + wheelValue) * Tinv;

    // mapTransform = mapScale * mapTranslation;

    this._ctx.scale(scaleFactor, scaleFactor);

    this.drawMap();
  }

  drawMap (): void {
    const { width, height } = this._hexSize;

    this._ctx.clearRect(0, 0, window.innerWidth * 2, window.innerHeight * 2);
    // this._ctx.fillStyle = 'grey';

    for (const { x, y } of this._map) {
      this._ctx.beginPath();
      this._ctx.fillRect(x, y, width, height);
      // this._drawHex(this._ctx, x, y, width);
      this._ctx.fill();
      this._ctx.closePath();
    }
  }

  move (x: number, y: number): void {
    this._xFinal = this._xOffset + x;
    this._yFinal = this._yOffset + y;

    if (!this._animate) {
      this._animate = true;
      this._smoothMove();
    }
  }

  private _smoothMove (): void {
    const moveX = (this._xFinal - this._xOffset) * this._offsetVelocity;
    const moveY = (this._yFinal - this._yOffset) * this._offsetVelocity;

    this._xOffset += moveX;
    this._yOffset += moveY;

    this._ctx.translate(this._xFinal - this._xOffset, this._yFinal - this._yOffset);

    this.drawMap();

    const xEnd: boolean = moveX > 0 ? this._xOffset >= this._xFinal - 1 : this._xOffset <= this._xFinal + 1;
    const yEnd: boolean = moveY > 0 ? this._yOffset >= this._yFinal - 1 : this._yOffset <= this._yFinal + 1;

    if (xEnd && yEnd) {
      this._ctx.translate(
        this._xFinal - this._xOffset,
        this._yFinal - this._yOffset,
      );

      this._xOffset = this._xFinal;
      this._yOffset = this._yFinal;
      this._animate = false;

      return;
    }

    requestAnimationFrame(this._smoothMove.bind(this));
  }

  click (x: number, y: number): void {
    const xMouse = x * this._scaleFactor;
    const yMouse = y * this._scaleFactor;
    const width = this._hexSize.width * this._scaleFactor;
    const height = this._hexSize.height * this._scaleFactor;

    for (const hex of this._map) {
      const xHex = hex.x * this._scaleFactor;
      const yHex = hex.y * this._scaleFactor;

      if (
        (xMouse >= xHex && xMouse <= xHex + width) &&
        (yMouse >= yHex && yMouse <= yHex + height)
      ) {
        console.log('find hex');
        this._ctx.fillStyle = 'green';
        this._ctx.fillRect(xHex, yHex, width, height);
        this._ctx.strokeRect(xHex - 1, yHex - 1, width + 1, height + 1);
        this._ctx.fillStyle = 'grey';
      }
    }
  }
}
