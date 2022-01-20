import { HexMap } from './HexMap';
import { TouchGroup } from './TouchGroup';
import { Vector } from './Vector';

export class EventManager {
  private _canvas: HTMLCanvasElement;
  private _map: HexMap;
  private _isDragging: boolean;
  private _touchGroup: TouchGroup | null;

  constructor(canvas: HTMLCanvasElement, map: HexMap) {
    this._canvas = canvas;
    this._map = map;
    this._isDragging = false;
    this._touchGroup = null;
  }

  private _keyDownCallback(e: KeyboardEvent): void {
    console.log('key down');
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
    e.preventDefault();

    if (e.ctrlKey) {
      this._map.zoom(e.deltaY, Vector.FromEventPosition(e));

      return;
    }

    if (e.shiftKey) {
      this._map.move(new Vector(e.deltaY, 0));

      return;
    }

    this._map.move(new Vector(e.deltaX, -e.deltaY));
  };

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

  setEvents(): void {
    window.onkeydown = this._keyDownCallback.bind(this);

    this._canvas.onwheel = this._mouseWheelCallback.bind(this);

    this._canvas.onmousedown = this._mouseDownCallback.bind(this);
    this._canvas.onmousemove = this._mouseMoveCallback.bind(this);
    this._canvas.onmouseup = this._mouseUpCallback.bind(this);

    this._canvas.ontouchstart = (e) => {
      const { touches } = e;

      e.preventDefault();

      if (touches.length === 1) {
        this._map.dragStart(Vector.FromEventPosition(touches[0]));

        return;
      }

      this._touchGroup = TouchGroup.FromTouchList(touches);
    };
    this._canvas.ontouchmove = (e) => {
      const { touches } = e;

      e.preventDefault();

      if (!this._touchGroup) {
        this._map.dragMove(Vector.FromEventPosition(touches[0]));

        return;
      }

      const firstDistanceX = touches[0].clientX - this._touchGroup.firstTouch.x;
      const secondDistanceX = touches[1].clientX - this._touchGroup.secondTouch.x;
      const scaleFactor = firstDistanceX + secondDistanceX;

      this._map.zoom(scaleFactor, this._touchGroup.middlePoint);

      this._touchGroup.firstTouch = Vector.FromEventPosition(touches[0]);
      this._touchGroup.secondTouch = Vector.FromEventPosition(touches[1]);
    };
    this._canvas.ontouchend = (e) => {
      e.preventDefault();
      this._touchGroup = null;
    };
  }
}
