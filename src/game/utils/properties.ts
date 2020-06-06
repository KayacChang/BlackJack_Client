import { isContainer, isSprite, isAnimatedSprite, isBitmapText, isText, isPoint } from './type';
import { Vec2 } from '../core';

export function setAnchor({ x = 0, y = 0 }: Vec2, ...children: any[]) {
  //
  children.forEach((child) => {
    //
    if (isSprite(child) || isAnimatedSprite(child) || isText(child)) {
      child.anchor.set(x, y);

      return;
    }

    if (isBitmapText(child) && isPoint(child.anchor)) {
      child.anchor.set(x, y);

      return;
    }
  });

  return children;
}

export function setPosition({ x = 0, y = 0 }: Vec2, ...children: any[]) {
  //
  children.forEach((child) => {
    //
    if (!isContainer(child)) {
      return;
    }

    child.position.set(x, y);
  });

  return children;
}
