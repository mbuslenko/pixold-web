export class Position {
  x: number;
  y: number;

  constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add (position: Position): Position {
    this.x += position.x;
    this.y += position.y;

    return this;
  }

  subtract (position: Position): Position {
    this.x -= position.x;
    this.y -= position.y;

    return this;
  }

  scale (scaleFactor: number): Position {
    this.x *= scaleFactor;
    this.y *= scaleFactor;

    return  this;
  }

  isAfter (position: Position): boolean {
    return this.x >= position.x && this.y >= position.y;
  }

  isBefore (position: Position): boolean {
    return this.x <= position.x && this.y <= position.y;
  }

  copy (): Position {
    return new Position(this.x, this.y);
  }
}
