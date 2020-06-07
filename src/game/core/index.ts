import { DisplayObject } from 'pixi.js';
import Element from './Element';
import Path from './Path';

export type Vec2 = {
  x?: number;
  y?: number;
};

export type MetaData = {
  element: DisplayObject;
  position?: Vec2;
  anchor?: Vec2;
};

export function isMetaData(target: any): target is MetaData {
  return 'element' in target;
}

export type Hierarchy = {
  [name: string]: MetaData | DisplayObject | DisplayObject[] | Record<string, DisplayObject | DisplayObject[]>;
};

export type Children = {
  [name: string]: PIXI.DisplayObject;
};

export { Element, Path };
export * from './utils';
