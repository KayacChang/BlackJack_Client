import Element from './Element';
import Path from './Path';
import { MetaData } from './type';
import render from './render';
import parse from './parse';

export function isMetaData(target: any): target is MetaData {
  return 'element' in target;
}

export { Element, Path, render, parse };
export * from './type';
export * from './utils';
