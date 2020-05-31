import { curry } from 'ramda';
import { isAnchorable, isContainer } from './type';
import { isNumber, isString } from 'util';

export const setAnchor = curry((value: number, children: any[]) => {
  //
  for (const child of children) {
    //
    if (isAnchorable(child)) {
      child.anchor.set(value);
    }
  }

  return children;
});

function isPercentage(value: string) {
  return value.endsWith('%');
}

function toPercentage(value: string) {
  return Number(value.slice(0, -1)) / 100;
}

export const setPosition = curry((position: Vec2, children: any[]) => {
  //
  for (const child of children) {
    //
    if (!isContainer(child)) {
      continue;
    }

    if (isNumber(position.x)) {
      child.x = position.x;
    }
    if (isNumber(position.y)) {
      child.y = position.y;
    }

    if (isString(position.x) && isPercentage(position.x)) {
      child.x = child.width * toPercentage(position.x);
    }
    if (isString(position.y) && isPercentage(position.y)) {
      child.y = child.height * toPercentage(position.y);
    }
  }
});
