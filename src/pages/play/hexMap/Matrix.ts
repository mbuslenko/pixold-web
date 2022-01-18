import { Vector } from './Vector';

export class Matrix {
  values: number[][];

  constructor(data: number[][]) {
    this.values = data;
  }

  copy(): Matrix {
    return new Matrix([...[...this.values]]);
  }

  multiply(matrix: Matrix): Matrix {
    for (let rowIndex = 0; rowIndex < this.values.length; rowIndex++) {
      const row = this.values[rowIndex];
      const newRow = [];

      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        newRow.push(
          row[0] * matrix.values[0][columnIndex] +
            row[1] * matrix.values[1][columnIndex] +
            row[2] * matrix.values[2][columnIndex],
        );
      }

      this.values[rowIndex] = newRow;
    }

    return this;
  }

  getTranslation(): Vector {
    return new Vector(this.values[0][2], this.values[1][2]);
  }

  setTranslation(vector: Vector): Matrix {
    this.values[0][2] = vector.x;
    this.values[1][2] = vector.y;

    return this;
  }

  getScaleFactor(): number {
    return this.values[0][0];
  }

  setScaleFactor(scaleFactor: number): Matrix {
    this.values[0][0] = scaleFactor;
    this.values[1][1] = scaleFactor;

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
}
