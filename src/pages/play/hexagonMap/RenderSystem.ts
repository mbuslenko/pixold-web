import { Color } from '../../../shared/ts/enums';
import { Hexagon } from './Hexagon';
import { IHexagonAttack } from './interfaces';
import { Matrix } from './Matrix';
import { Size } from './Size';
import { Vector } from './Vector';

export class RenderSystem {
  private _contextHexagon: CanvasRenderingContext2D;
  private _contextLine: CanvasRenderingContext2D;

  private _hexagonPathAll: Path2D[];

  private _lineWidth: number;
  private _leftAttackLineOffset: number;
  private _rightAttackLineOffset: number;

  constructor(ctxHexagon: CanvasRenderingContext2D, ctxLine: CanvasRenderingContext2D, hexagonAll: Hexagon[]) {
    this._contextHexagon = ctxHexagon;
    this._contextLine = ctxLine;

    this._hexagonPathAll = hexagonAll.map((hexagon) => this._getHexagonPath(hexagon));

    this._lineWidth = 1;
    this._rightAttackLineOffset = 0;
    this._leftAttackLineOffset = 0;

    this._setContextAll();
  }

  private _setContextAll(): void {
    this._contextLine.lineCap = 'round';
    this._contextLine.lineWidth = this._lineWidth;
    this._contextLine.setLineDash([100, 50]);

    this._contextHexagon.lineWidth = this._lineWidth;
    this._contextHexagon.strokeStyle = 'white';
    this._contextHexagon.setLineDash([]);
  }

  resize(): void {
    this._setContextAll();
  }

  clearHexagonAll(sceneSize: Size): void {
    this._contextHexagon.clearRect(-200, -200, sceneSize.width + 400, sceneSize.height + 400);
  }

  clearActiveHexagon(hexagon: Hexagon): void {
    this._contextHexagon.fillStyle = hexagon.color;

    // HACK: test
    this._contextHexagon.strokeStyle = Color.BLACK;

    this._contextHexagon.stroke(this._hexagonPathAll[hexagon.id]);
    this._contextHexagon.fill(this._hexagonPathAll[hexagon.id]);
  }

  clearLineAll(sceneSize: Size): void {
    // TODO: or should i forbid user to mouse over them map?
    this._contextLine.clearRect(-sceneSize.width, -sceneSize.height, sceneSize.width * 3, sceneSize.height * 3);
  }

  setTransformHexagonAll(transform: Matrix): void {
    Matrix.SetMatrixToContext(transform, this._contextHexagon);
  }

  setTransformLineAll(transform: Matrix): void {
    Matrix.SetMatrixToContext(transform, this._contextLine);
  }

  drawHexagonAll(hexagonAll: Hexagon[]): void {
    for (const hexagon of hexagonAll) {
      this._contextHexagon.fillStyle = hexagon.color;
      this._contextHexagon.fill(this._hexagonPathAll[hexagon.id]);
    }
  }

  drawActiveHexagonAll(hexagonAll: Hexagon[]): void {
    this._contextHexagon.strokeStyle = Color.WHITE;

    for (const hexagon of hexagonAll) {
      this._contextHexagon.fillStyle = hexagon.color;
      this._contextHexagon.stroke(this._hexagonPathAll[hexagon.id]);
    }
  }

  drawActiveAttackLine(attackLine: { from: Vector; to: Vector; color: string }) {
    this._contextLine.lineDashOffset = this._leftAttackLineOffset;
    this.drawAttackLine(attackLine);
  }

  drawAttackLine(attackLine: { from: Vector; to: Vector; color: string }) {
    const { from, to, color } = attackLine;
    const { x, y } = to.copy().subtract(from);
    const middlePoint = to
      .copy()
      .add(from)
      .divideByValue(2)
      .addX(-y / 3)
      .addY(-x / 3);

    this._contextLine.beginPath();
    this._contextLine.moveTo(from.x, from.y);
    this._contextLine.quadraticCurveTo(middlePoint.x, middlePoint.y, to.x, to.y);
    this._contextLine.strokeStyle = color;
    this._contextLine.stroke();
    this._contextLine.closePath();
  }

  private _drawHexagonAttack(hexagonAttack: IHexagonAttack) {
    const { attacker, defender } = hexagonAttack;

    const { x, y } = defender.position.copy().subtract(attacker.position);
    const middlePoint = defender.position
      .copy()
      .add(attacker.position)
      .divideByValue(2)
      .addX(-y / 3)
      .addY(-x / 3);

    this._contextLine.beginPath();
    this._contextLine.moveTo(attacker.position.x, attacker.position.y);
    this._contextLine.quadraticCurveTo(middlePoint.x, middlePoint.y, defender.position.x, defender.position.y);
    this._contextLine.strokeStyle = attacker.color;
    this._contextLine.stroke();
    this._contextLine.closePath();
  }

  drawHexagonAttackAll(leftHexagonAttacks: IHexagonAttack[], rightHexagonAttacks: IHexagonAttack[]): void {
    this._leftAttackLineOffset -= 1 % 2;
    this._contextLine.lineDashOffset = this._leftAttackLineOffset;

    for (const attack of leftHexagonAttacks) {
      this._drawHexagonAttack(attack);
    }

    this._rightAttackLineOffset += 1 % 2;
    this._contextLine.lineDashOffset = this._rightAttackLineOffset;

    for (const attack of rightHexagonAttacks) {
      this._drawHexagonAttack(attack);
    }
  }

  private _getHexagonPath(hexagon: Hexagon): Path2D {
    const { x, y } = hexagon.position;
    const hexagonPath = new Path2D();

    hexagonPath.moveTo(x, y - Hexagon.radius);
    hexagonPath.lineTo(x + Hexagon.xPathOffset, y - Hexagon.radiusHalf);
    hexagonPath.lineTo(x + Hexagon.xPathOffset, y + Hexagon.radiusHalf);
    hexagonPath.lineTo(x, y + Hexagon.radius);
    hexagonPath.lineTo(x - Hexagon.xPathOffset, y + Hexagon.radiusHalf);
    hexagonPath.lineTo(x - Hexagon.xPathOffset, y - Hexagon.radiusHalf);
    hexagonPath.closePath();

    return hexagonPath;
  }
}
