import { Vector } from './Vector';

export class Matrix {
  value: number[][];

  constructor(data: number[][]) {
    this.value = data;
  }

  copy(): Matrix {
    return new Matrix([...[...this.value]]);
  }

  multiply(matrix: Matrix): Matrix {
    for (let rowIndex = 0; rowIndex < this.value.length; rowIndex++) {
      const row = this.value[rowIndex];
      const newRow = [];

      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        newRow.push(
          row[0] * matrix.value[0][columnIndex] +
            row[1] * matrix.value[1][columnIndex] +
            row[2] * matrix.value[2][columnIndex],
        );
      }

      this.value[rowIndex] = newRow;
    }

    return this;
  }

  getTranslation(): Vector {
    return new Vector(this.value[0][2], this.value[1][2]);
  }

  setTranslation(vector: Vector): Matrix {
    this.value[0][2] = vector.x;
    this.value[1][2] = vector.y;

    return this;
  }

  getScaleFactor(): number {
    return this.value[0][0];
  }

  setScaleFactor(scaleFactor: number): Matrix {
    this.value[0][0] = scaleFactor;
    this.value[1][1] = scaleFactor;

    return this;
  }

  static CreateScale(scaleFactor: number): Matrix {
    return new Matrix([
      [scaleFactor, 0, 0],
      [0, scaleFactor, 0],
      [0, 0, 1],
    ]);
  }

  static CreateTranslate(vector: Vector): Matrix {
    return new Matrix([
      [1, 0, vector.x],
      [0, 1, vector.y],
      [0, 0, 1],
    ]);
  }

  static CreateIdentity(): Matrix {
    return new Matrix([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
  }

  static SetMatrixToContext(matrix: Matrix, context: CanvasRenderingContext2D): void {
    context.setTransform(
      matrix.value[0][0],
      matrix.value[1][0],
      matrix.value[0][1],
      matrix.value[1][1],
      matrix.value[0][2],
      matrix.value[1][2],
    );
  }
}
