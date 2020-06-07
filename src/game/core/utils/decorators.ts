import { DisplayObject } from 'pixi.js';

interface Constructor<T> {
  new (...args: any[]): T;
}

export function Interactable<T extends Constructor<DisplayObject>>(Constructor: T) {
  //
  Constructor.prototype.interactive = true;

  return Constructor;
}

export function Clickable<T extends Constructor<DisplayObject>>(Constructor: T) {
  //
  Constructor.prototype.interactive = true;
  Constructor.prototype.buttonMode = true;

  return Constructor;
}
