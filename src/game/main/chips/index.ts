import { Container, Sprite, Text } from 'pixi.js';
import { observe } from '../../../store';
import { Bet, SEAT, Seats } from '../../../models';
import { without } from 'ramda';
import Chip from './chip';
import gsap from 'gsap';

type Props = {
  id: SEAT;
  x: number;
  y: number;
};

function Group(id: SEAT, x: number, y: number) {
  //
  const name = SEAT[id];

  const group = Object.assign(new Container(), { name, x, y });

  const field = new Text('', {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fill: 0xffffff,
    fontSize: 48,
  });
  field.name = 'field';
  field.x = 120;
  field.anchor.set(0, 0.5);

  group.addChild(field);

  return group;
}

function transIn(chip: Sprite) {
  chip.y -= 50;

  gsap.to(chip, { y: 0, alpha: 1 });
}

function findGroupBySeatID(groups: Container[], seat: SEAT) {
  //
  return groups.find(({ name }) => name === SEAT[seat]);
}

function removeAllChips(group: Container) {
  group.children
    //
    .filter(({ name }) => name !== 'field')
    .forEach((child) => group.removeChild(child));
}

function updateChip(groups: Container[]) {
  let pre: Bet[] = [];

  function addChip({ seat, chip }: Bet) {
    //
    if (!seat) {
      return;
    }

    const group = findGroupBySeatID(groups, seat);
    if (!group) {
      return;
    }

    const _chip = Chip(chip);
    group.addChild(_chip);
    transIn(_chip);
  }

  return function onUpdate(history: Bet[]) {
    //
    if (history.length > pre.length) {
      without(pre, history).forEach(addChip);
    }

    pre = [...history];
  };
}

function updateSeat(groups: Container[]) {
  //
  function setBet(group: Container, totalBet: number) {
    const field = group.getChildByName('field') as Text;

    field.text = totalBet ? String(totalBet) : '';
  }

  return function onUpdate(seats: Seats) {
    //
    for (const [id, seat] of Object.entries(seats)) {
      const group = findGroupBySeatID(groups, Number(id) as SEAT);

      if (!group) {
        continue;
      }

      setBet(group, seat.bet);

      if (seat.bet === 0) {
        removeAllChips(group);
      }
    }
  };
}

function init(container: Container, meta: Props[]) {
  //
  return function onInit({ width, height }: Container) {
    //
    const seats = meta.map(({ id, x, y }) => Group(id, width * x, height * y));

    container.addChild(...seats);

    observe((state) => state.bet.history, updateChip(seats));
    observe((state) => state.seat, updateSeat(seats));
  };
}

export default function Chips(meta: Props[]) {
  const chips = new Container();
  chips.name = 'chips';
  chips.once('added', init(chips, meta));

  return chips;
}
