import Background from './Background';
import Seat from './Seat';
import { Sprite } from 'pixi.js';
import Element from '../core/Element';
import { Children } from '../core';
import Card from './Card';

export default class Main extends Element {
  //
  get view() {
    return {
      background: new Background(),
      seatA: new Seat(),
      seatB: new Seat(),
      seatC: new Seat(),
      seatD: new Seat(),
      seatE: new Seat(),
    };
  }

  onCreate({ background, seatA, seatB, seatC, seatD, seatE }: Children) {
    const { width, height } = background as Sprite;

    seatA.x = width * (50 / 100);
    seatA.y = height * (82 / 100);

    seatB.x = width * (30 / 100);
    seatB.y = height * (75 / 100);

    seatC.x = width * (70 / 100);
    seatC.y = height * (75 / 100);

    seatD.x = width * (15 / 100);
    seatD.y = height * (58 / 100);

    seatE.x = width * (85 / 100);
    seatE.y = height * (58 / 100);

    const card = Card();
    card.x = width / 2;
    card.y = height / 2;

    this.addChild(card);
  }
}
