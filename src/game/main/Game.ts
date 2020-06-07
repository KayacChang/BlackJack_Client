import { Element, Path, Children, Vec2 } from '../core';
import Poker from './components/Poker';
import { mapObjIndexed, map } from 'ramda';
import { Container } from 'pixi.js';

function createPath(point: Vec2) {
  const startPoint = { x: 2515, y: 160 };

  return new Path([startPoint, point]);
}

function setOffset({ x = 0, y = 0 }: Vec2, index: number, array: Vec2[]) {
  //
  index = Math.round(index - array.length / 2);

  const offsetX = 50;
  x = x + index * offsetX;

  return { x, y };
}

function Points(count: number, point: Vec2) {
  return new Array(count).fill(point).map(setOffset);
}

function Paths() {
  //
  const gen5Points = (point: Vec2) => Points(5, point);

  const endPoints = {
    pathA: gen5Points({ x: 443, y: 630 }),
    pathB: gen5Points({ x: 888, y: 880 }),
    pathC: gen5Points({ x: 1480, y: 980 }),
    pathD: gen5Points({ x: 2072, y: 880 }),
    pathE: gen5Points({ x: 2515, y: 630 }),
  };

  return mapObjIndexed(map(createPath))(endPoints);
}

export default class Game extends Element {
  //
  get view() {
    return {
      pokers: [],
      ...Paths(),
    };
  }

  onCreate({ pokers, pathA, pathB, pathC, pathD, pathE }: Children) {
    //
    for (const paths of [pathA, pathB, pathC, pathD, pathE]) {
      const { children } = paths as Container;

      for (const path of children) {
        const poker = new Poker('CLUB', 'A');

        (pokers as Container).addChild(poker);

        (path as Path).attach(poker);
      }
    }
  }
}
