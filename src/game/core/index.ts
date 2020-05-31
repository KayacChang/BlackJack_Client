import { DisplayObject, Sprite } from 'pixi.js';
import Element from './Element';

export type Vec2 = {
  x?: number;
  y?: number;
};

export type MetaData = {
  element: DisplayObject;
  position?: Vec2;
  anchor?: Vec2;
};

export type Hierarchy = { [name: string]: MetaData | Element | Sprite };

export type Children = { [name: string]: PIXI.DisplayObject };
