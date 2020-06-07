import { Element, Path, Children } from '../core';
import Poker from './components/Poker';
import { Container } from 'pixi.js';
import Paths from './Paths';

export default class Game extends Element {
  //
  get view() {
    return {
      pokers: [],
      paths: Paths(),
    };
  }

  onCreate({ pokers, paths }: Children) {
    //
    for (const group of (paths as Container).children) {
      //
      for (const path of (group as Container).children) {
        //
        const poker = new Poker('CLUB', 'A');

        (pokers as Container).addChild(poker);

        (path as Path).attach(poker);
      }
    }
  }
}
