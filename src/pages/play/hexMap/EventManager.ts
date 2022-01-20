import { HexMap } from './HexMap';
import { TouchGroup } from './TouchGroup';
import { Vector } from './Vector';

export class EventManager {
  private _canvas: HTMLCanvasElement;
  private _map: HexMap;
  private _isDragging: boolean;
  private _touchGroup: TouchGroup | null;
  private _touchClick: boolean;
  private _touchClickTimer: number;

  constructor(canvas: HTMLCanvasElement, map: HexMap) {
    this._canvas = canvas;
    this._map = map;
    this._isDragging = false;
    this._touchGroup = null;
    this._touchClick = false;
    this._touchClickTimer = 0;
  }

  private _keyDownCallback(e: KeyboardEvent): void {
    console.log('key down');
    switch (e.key) {
      case 'ArrowRight':
        this._map.move(new Vector(-180, 0));
        break;
      case 'ArrowLeft':
        this._map.move(new Vector(180, 0));
        break;
      case 'ArrowUp':
        this._map.move(new Vector(0, 100));
        break;
      case 'ArrowDown':
        this._map.move(new Vector(0, -100));
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

  private _touchStartCallback = (e: TouchEvent): void => {
    const { touches } = e;

    e.preventDefault();

    if (touches.length === 1) {
      this._map.dragStart(Vector.FromEventPosition(touches[0]));

      this._touchClick = true;
      this._touchClickTimer = window.setTimeout(() => (this._touchClick = false), 200);

      return;
    }

    this._touchGroup = TouchGroup.FromTouchList(touches);
  };

  private _touchMoveCallback = (e: TouchEvent): void => {
    const { touches } = e;

    // TODO: check if e.preventDefault() even necessary now
    e.preventDefault();

    if (!this._touchGroup) {
      this._map.dragMove(Vector.FromEventPosition(touches[0]));

      return;
    }

    const scaleFactor = this._touchGroup.firstTouch.distance(this._touchGroup.secondTouch) / 10;

    this._map.zoom(-scaleFactor, this._touchGroup.middlePoint);

    this._touchGroup.firstTouch = Vector.FromEventPosition(touches[0]);
    this._touchGroup.secondTouch = Vector.FromEventPosition(touches[1]);
  };

  private _touchEndCallback(e: TouchEvent): void {
    e.preventDefault();

    if (!this._touchGroup && this._touchClick) {
      clearTimeout(this._touchClickTimer);
      this._touchClick = false;
      this._map.click(Vector.FromEventPosition(e.touches[0]));
    }

    this._touchGroup = null;
  }

  setEvents(): void {
    window.onresize = () => this._map.resize();

    window.onkeydown = this._keyDownCallback.bind(this);

    this._canvas.onwheel = this._mouseWheelCallback.bind(this);

    this._canvas.onmousedown = this._mouseDownCallback.bind(this);
    this._canvas.onmousemove = this._mouseMoveCallback.bind(this);
    this._canvas.onmouseup = this._mouseUpCallback.bind(this);

    window.ontouchstart = this._touchStartCallback.bind(this);
    window.ontouchmove = this._touchMoveCallback.bind(this);
    window.ontouchend = this._touchEndCallback.bind(this);
  }
}
