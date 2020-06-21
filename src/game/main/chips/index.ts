import { Container, Sprite } from 'pixi.js';
import { observe } from '../../../store';
import { Bet, SEAT, Vec2 } from '../../../models';
import { without } from 'ramda';
import Chip from './chip';
import gsap from 'gsap';

type Props = {
  id: SEAT;
  x: number;
  y: number;
};

function placeChipAnim(chip: Sprite, { x, y }: Vec2) {
  const offsetY = 50;

  Object.assign(chip, { x, y: y - offsetY });

  gsap.to(chip, { y, alpha: 1 });
}

function update(container: Container, meta: Props[]) {
  let pre: Bet[] = [];

  return function onUpdate(history: Bet[]) {
    const diff = without(pre, history)[0];

    if (!diff) {
      return;
    }

    const seat = meta.find(({ id }) => id === diff.seat);

    if (!seat) {
      return;
    }

    const chip = Chip(diff.chip);
    container.addChild(chip);

    placeChipAnim(chip, {
      x: seat.x,
      y: seat.y,
    });

    pre = [...history];
  };
}

function init(container: Container, meta: Props[]) {
  //
  return function onInit({ width, height }: Container) {
    //
    const seats = meta.map(({ id, x, y }) => ({
      id: id,
      x: width * x,
      y: height * y,
    }));

    observe((state) => state.bet.history, update(container, seats));
  };
}

export default function Chips(meta: Props[]) {
  const chips = new Container();
  chips.name = 'chips';
  chips.once('added', init(chips, meta));

  return chips;
}
