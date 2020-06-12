import { DisplayObject } from 'pixi.js';

export type Vec2 = {
  x?: number;
  y?: number;
};

export type MetaData = {
  element: DisplayObject;
  position?: Vec2;
  anchor?: Vec2;
};

export type Hierarchy = {
  [name: string]: MetaData | DisplayObject | DisplayObject[] | Record<string, DisplayObject | DisplayObject[]>;
};

export type Children = {
  [name: string]: PIXI.DisplayObject;
};

export type Node = {
  children?: Record<string, Node>;
  components?: Record<string, {}>;
};