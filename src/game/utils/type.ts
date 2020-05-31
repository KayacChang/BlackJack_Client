import { curry, anyPass } from 'ramda';
import { Sprite, AnimatedSprite, BitmapText, Container } from 'pixi.js';

const is = curry(<T>(T: any, element: any): element is T => element instanceof T);

export const isContainer = is(Container);

export const isSprite = is(Sprite);
export const isAnimatedSprite = is(AnimatedSprite);
export const isBitmapText = is(BitmapText);
export const isText = is(Text);
export const isAnchorable = anyPass([isSprite, isAnimatedSprite, isBitmapText, isText]);
