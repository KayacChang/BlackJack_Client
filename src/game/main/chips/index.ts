import { Container, Sprite, Text } from 'pixi.js';
import { observe } from '../../../store';
import { Bet, SEAT } from '../../../models';
import { without } from 'ramda';
import Chip from './chip';
import gsap from 'gsap';

type Props = {
  id: SEAT;
  x: number;
  y: number;
};

function transIn(chip: Sprite) {
  chip.y -= 50;

  gsap.to(chip, { y: 0, alpha: 1 });
}

function update(groups: Container[]) {
  let pre: Bet[] = [];

  return function onUpdate(history: Bet[]) {
    //
    const diff = without(pre, history)[0];
    if (diff === undefined || diff.seat === undefined) {
      return;
    }

    const target = diff.seat;
    const group = groups.find(({ name }) => name === SEAT[target]);
    if (!group) {
      return;
    }

    const chip = Chip(diff.chip);
    group.addChild(chip);

    const total = history
      //
      .filter(({ seat }) => diff.seat === seat)
      .reduce((total, { amount }) => total + amount, 0);

    group.emit('update', String(total));

    transIn(chip);

    pre = [...history];
  };
}

function Group(id: SEAT, x: number, y: number) {
  //
  const name = SEAT[id];

  const group = Object.assign(new Container(), { name, x, y });

  const field = new Text('123', {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 0xffffff,
    fontSize: 48,
  });
  field.x = 120;
  field.anchor.set(0, 0.5);

  group.on('update', (total: string) => {
    field.text = total;

    group.addChild(field);
  });

  return group;
}

function init(container: Container, meta: Props[]) {
  //
  return function onInit({ width, height }: Container) {
    //
    const seats = meta.map(({ id, x, y }) => Group(id, width * x, height * y));

    container.addChild(...seats);

    observe((state) => state.bet.history, update(seats));
  };
}

export default function Chips(meta: Props[]) {
  const chips = new Container();
  chips.name = 'chips';
  chips.once('added', init(chips, meta));

  return chips;
}
