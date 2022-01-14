import { HexMap } from './HexMap';
import { Vector } from './Vector';

export class EventManager {
  private _map: HexMap;

  constructor (map: HexMap) {
    this._map = map;
  }

  private _wheelCallback (e: WheelEvent): void {
    if (e.deltaY > 0) {
      this._map.zoom(-0.25, Vector.FromMouseEvent(e));
    } else {
      this._map.zoom(0.25, Vector.FromMouseEvent(e));
    }
  }

  private _keyDownCallback (e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowRight':
        this._map.move(new Vector(222, 0));
        break;
      case 'ArrowLeft':
        this._map.move(new Vector(-222, 0));
        break;
      case 'ArrowUp':
        this._map.move(new Vector(0, -222));
        break;
      case 'ArrowDown':
        this._map.move(new Vector(0, 222));
        break;
    }
  }

  setWindowEvents (): void {
    window.onkeydown = this._keyDownCallback.bind(this);

    window.onwheel = this._wheelCallback.bind(this);

    window.onclick = (e) => this._map.click(Vector.FromMouseEvent(e));
    window.ondblclick = (e) => this._map.zoom(0.25, Vector.FromMouseEvent(e));

    window.onmousedown = e => this._map.dragStart(Vector.FromMouseEvent(e));
    window.onmousemove = e => this._map.dragMove(Vector.FromMouseEvent(e));
    window.onmouseup = () => this._map.dragEnd();

    window.ontouchstart = ({ touches }) => {
      if (touches.length === 1) {
        this._map.dragStart(Vector.FromTouch(touches[0]));

        return;
      }

      // TODO: after test need to replace scale() to zoom()
      this._map.scale(
        Vector.FromTouch(touches[0])
          .subtract(Vector.FromTouch(touches[1]))
          .x
      );
    };
    window.ontouchmove = ({ touches }) => {
      if (touches.length === 1) {
        this._map.dragMove(Vector.FromTouch(touches[0]));

        return;
      }

      this._map.scale(
        Vector.FromTouch(touches[0])
          .subtract(Vector.FromTouch(touches[1]))
          .x
      );
    };
    window.ontouchend = () => this._map.dragEnd();
  }
}
