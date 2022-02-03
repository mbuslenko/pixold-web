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
  private _isPressedSpace: boolean;
  private _drawAttackLine: boolean;

  constructor(context: HTMLElement, map: HexagonMap) {
    this._context = context;
    this._map = map;
    this._isDragging = false;
    this._touchGroup = null;
    this._lastTouch = new Vector(0, 0);
    this._touchClick = false;
    this._touchClickTimer = 0;
    this._isPressedSpace = false;
    this._drawAttackLine = false;
  }

  get drawAttackLine (): boolean {
    return this._drawAttackLine;
  }

  set drawAttackLine (value: boolean) {
    if (!value) {
      this._map.hideAttackLine()
    }

    this._drawAttackLine = value;
  }

  private _keyDownCallback(e: KeyboardEvent): void {
    switch (e.code) {
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
      case 'Space':
        this._context.style.cursor = 'grab';
        this._isPressedSpace = true;
        e.preventDefault();
        break;
      case 'ControlLeft' || 'ControlRight':
        this._context.style.cursor = 'zoom-in';
        break;
    }
  }

  private _keyUpCallback(e: KeyboardEvent): void {
    switch (e.code) {
      case 'Space':
        this._isPressedSpace = false;

        if (!this._isDragging) {
          this._context.style.cursor = 'default';
        }

        e.preventDefault();
        break;
      case 'ControlLeft' || 'ControlRight':
        this._context.style.cursor = 'default';
    }
  }

  private _mouseWheelCallback = (e: WheelEvent): void => {
    e.preventDefault();

    if (e.ctrlKey) {
      this._map.zoom(e.deltaY, Vector.FromEventPosition(e));

      if (e.deltaY > 0) {
        this._context.style.cursor = 'zoom-out';

        return;
      }

      this._context.style.cursor = 'zoom-in';

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

    if (this._isPressedSpace) {
      this._isDragging = true;
      this._map.dragStart(Vector.FromEventPosition(e));
    }
  };

  private _mouseMoveCallback = (e: MouseEvent): void => {
    e.preventDefault();

    if (this._drawAttackLine) {
      this._map.drawAttackLine(Vector.FromEventPosition(e));
    }

    if (this._isDragging) {
      this._map.dragMove(Vector.FromEventPosition(e));

      return;
    }
  };

  private _mouseUpCallback = (e: MouseEvent): void => {
    e.preventDefault();

    if (this._isDragging) {
      this._isDragging = false;
      this._context.style.cursor = 'default';

      return;
    }

    this._map.click(Vector.FromEventPosition(e));
  };

  private _touchStartCallback = (e: TouchEvent): void => {
    const { touches } = e;

    e.preventDefault();

    if (touches.length === 1) {
      const firstTouch = Vector.FromEventPosition(touches[0]);

      this._map.dragStart(firstTouch);
      this._lastTouch = firstTouch;

      this._touchClick = true;
      // I use window.setTimeout instead of setTimeout because I need setTimeout to return type number instead of NodeJS.Timeout
      this._touchClickTimer = window.setTimeout(() => (this._touchClick = false), 250);

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
    window.onkeyup = this._keyUpCallback.bind(this);

    this._context.onwheel = this._mouseWheelCallback.bind(this);

    this._context.onmousedown = this._mouseDownCallback.bind(this);
    this._context.onmousemove = this._mouseMoveCallback.bind(this);
    this._context.onmouseup = this._mouseUpCallback.bind(this);

    // TODO: check touch positions and maybe select hexagon NEAR to touch position
    this._context.ontouchstart = this._touchStartCallback.bind(this);
    this._context.ontouchmove = this._touchMoveCallback.bind(this);
    this._context.ontouchend = this._touchEndCallback.bind(this);

    document.body.style.overflow = 'hidden';
  }

  unsetEvents(): void {
    window.onresize = null;

    window.onkeydown = null;
    window.onkeyup = null;

    this._context.onwheel = null;

    this._context.onmousedown = null;
    this._context.onmousemove = null;
    this._context.onmouseup = null;

    this._context.ontouchstart = null;
    this._context.ontouchmove = null;
    this._context.ontouchend = null;

    document.body.style.overflow = 'unset';
    this._context.style.cursor = 'default';
  }
}
