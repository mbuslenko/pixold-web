import { HexMap } from './HexMap';
import { TouchGroup } from './TouchGroup';
import { Vector } from './Vector';

export class EventManager {
  private _context: HTMLElement;
  private _map: HexMap;
  private _isDragging: boolean;
  private _touchGroup: TouchGroup | null;

  constructor(context: HTMLElement, map: HexMap) {
    this._context = context;
    this._map = map;
    this._isDragging = false;
    this._touchGroup = null;
  }

  private _keyDownCallback(e: KeyboardEvent): void {
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

  private _mouseWheelCallback = (e: WheelEvent): void => {
    if (e.ctrlKey) {
      e.preventDefault();
      this._map.zoom(e.deltaY, Vector.FromEventPosition(e));
    }
  }

  private _mouseDownCallback = (e: MouseEvent): void => {
    if (e.shiftKey) {
      this._isDragging = true;
      this._map.dragStart(Vector.FromEventPosition(e));
    }
  };
  private _mouseMoveCallback = (e: MouseEvent): void => {
    if (this._isDragging) {
      this._map.dragMove(Vector.FromEventPosition(e));
    }
  };
  private _mouseUpCallback = (e: MouseEvent): void => {
    if (this._isDragging) {
      this._isDragging = false;

      return;
    }

    this._map.click(Vector.FromEventPosition(e));
  };

  setWindowEvents(): void {
    this._context.onkeydown = this._keyDownCallback.bind(this);

    this._context.onwheel = this._mouseWheelCallback.bind(this);

    this._context.onmousedown = this._mouseDownCallback.bind(this);
    this._context.onmousemove = this._mouseMoveCallback.bind(this);
    this._context.onmouseup = this._mouseUpCallback.bind(this);

    this._context.ontouchstart = ({ touches }) => {
      if (touches.length === 1) {
        this._map.dragStart(Vector.FromEventPosition(touches[0]));

        return;
      }

      this._touchGroup = TouchGroup.FromTouchList(touches);
    };
    this._context.ontouchmove = ({ touches }) => {
      if (!this._touchGroup) {
        this._map.dragMove(Vector.FromEventPosition(touches[0]));

        return;
      }

      const firstDistanceX = touches[0].clientX - this._touchGroup.firstTouch.x;
      const secondDistanceX = touches[1].clientX - this._touchGroup.secondTouch.x;
      const scaleFactor = (firstDistanceX + secondDistanceX) / 10;

      this._map.zoom(scaleFactor, this._touchGroup.middlePoint);

      this._touchGroup.firstTouch = Vector.FromEventPosition(touches[0]);
      this._touchGroup.secondTouch = Vector.FromEventPosition(touches[1]);
    };
    this._context.ontouchend = ({ touches }) => {
      if (touches.length > 0) {
        return;
      }

      this._touchGroup = null;
    };
  }
}
