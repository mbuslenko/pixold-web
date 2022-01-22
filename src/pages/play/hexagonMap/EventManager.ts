import { HexagonMap } from './HexagonMap';
import { TouchGroup } from './TouchGroup';
import { Vector } from './Vector';

export class EventManager {
  private _context: HTMLElement;
  private _map: HexagonMap;
  private _isDragging: boolean;
  private _touchGroup: TouchGroup | null;
  private _lastTouch: Vector;
  private _touchClick: boolean;
  private _touchClickTimer: number;

  constructor(context: HTMLElement, map: HexagonMap) {
    this._context = context;
    this._map = map;
    this._isDragging = false;
    this._touchGroup = null;
    this._lastTouch = new Vector(0, 0);
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

    this._map.move(new Vector(-e.deltaX, -e.deltaY));
  };

  private _mouseDownCallback = (e: MouseEvent): void => {
    e.preventDefault();

    if (e.shiftKey) {
      this._isDragging = true;
      this._map.dragStart(Vector.FromEventPosition(e));
    }
  };

  private _mouseMoveCallback = (e: MouseEvent): void => {
    e.preventDefault();

    if (this._isDragging) {
      this._map.dragMove(Vector.FromEventPosition(e));
    }
  };

  private _mouseUpCallback = (e: MouseEvent): void => {
    e.preventDefault();

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
      this._touchClickTimer = window.setTimeout(() => (this._touchClick = false), 500);

      return;
    }

    this._touchGroup = TouchGroup.FromTouchList(touches);
  };

  private _touchMoveCallback = (e: TouchEvent): void => {
    const { touches } = e;

    e.preventDefault();

    const firstTouch = Vector.FromEventPosition(touches[0]);

    this._lastTouch = firstTouch;

    if (!this._touchGroup) {
      this._map.dragMove(firstTouch);

      return;
    }

    const secondTouch = Vector.FromEventPosition(touches[1]);
    const distanceToMiddle =
      firstTouch.distance(this._touchGroup.middlePoint) + secondTouch.distance(this._touchGroup.middlePoint);

    this._map.zoom(-(distanceToMiddle - this._touchGroup.distanceToMiddle) / 10, this._touchGroup.middlePoint);

    this._touchGroup.firstTouch = firstTouch;
    this._touchGroup.secondTouch = secondTouch;
    this._touchGroup.distanceToMiddle = distanceToMiddle;
  };

  private _touchEndCallback(): void {
    if (!this._touchGroup && this._touchClick) {
      clearTimeout(this._touchClickTimer);
      this._touchClick = false;
      this._map.click(this._lastTouch);
    }

    this._touchGroup = null;
  }

  setEvents(): void {
    window.onresize = this._map.resize.bind(this._map);

    window.onkeydown = this._keyDownCallback.bind(this);

    this._context.onwheel = this._mouseWheelCallback.bind(this);

    this._context.onmousedown = this._mouseDownCallback.bind(this);
    this._context.onmousemove = this._mouseMoveCallback.bind(this);
    this._context.onmouseup = this._mouseUpCallback.bind(this);

    window.ontouchstart = this._touchStartCallback.bind(this);
    window.ontouchmove = this._touchMoveCallback.bind(this);
    window.ontouchend = this._touchEndCallback.bind(this);
  }

  unsetEvents(): void {
    window.onresize = null;

    window.onkeydown = null;

    this._context.onwheel = null;

    this._context.onmousedown = null;
    this._context.onmousemove = null;
    this._context.onmouseup = null;

    window.ontouchstart = null;
    window.ontouchmove = null;
    window.ontouchend = null;
  }
}