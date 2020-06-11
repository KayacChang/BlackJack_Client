import Seats from './seats';
import { User, toSuit, toRank } from '../models';
import { observable, reaction } from 'mobx';
import { GAME, SEAT } from '../constants';

interface Round {
  id: string;
  shoe: number;
  state: GAME;
}

const round = observable({} as Round);

reaction(() => round.id, onRoundChange);
function onRoundChange() {
  console.groupEnd();
  console.group(`Round`, { id: round.id, shoe: round.shoe });
}

// reaction(() => round.shoe, onShoeChange);
// function onShoeChange(shoe: number) {
//   console.log(`Shoe`, shoe);
// }

reaction(() => round.state, onStateChange);
function onStateChange(state: GAME) {
  switch (state) {
    case GAME.BETTING:
      return console.group('BETTING');
    case GAME.BET_END:
      console.log('BET END');
      return console.groupEnd();
  }
}

interface Props {
  round: string;
  seats: any[];
  shoe_num: number;
  state: [GAME];
}

function join(data: Props) {
  //
  betting(data);

  if (!data.seats || !Array.isArray(data.seats)) {
    throw new Error(`Missing props [seats] ...`);
  }

  for (const { no, player } of data.seats) {
    if (!player) {
      continue;
    }

    const user = new User({ name: player });

    Seats.add(no, user);
  }

  Seats.add(SEAT.DEALER, {
    name: 'dealer',
  });

  return round;
}

function betting(data: Props) {
  //
  if (!data.round) {
    throw new Error(`Missing props [round] ...`);
  }
  if (!data.shoe_num) {
    throw new Error(`Missing props [shoe_num] ...`);
  }

  round.shoe = Number(data.shoe_num);
  round.id = String(data.round);
  round.state = data.state ? data.state[0] : GAME.BETTING;
}

function setState(state: GAME) {
  round.state = state;
}

function Card([suit, rank]: string) {
  return {
    suit: toSuit(suit),
    rank: toRank(rank),
  };
}

interface DealProp {
  no: number;
  card: string;
  points: number;
  shoe_num: number;
}

function deal(...data: DealProp[]) {
  let shoe = round.shoe;

  for (const { no, card, points, shoe_num } of data) {
    Seats.addCard(no, Card(card), points);

    if (shoe_num) {
      shoe = Math.min(shoe, shoe_num);
    }
  }

  round.shoe = shoe;
}

function settle(data: any[]) {
  console.groupCollapsed('SETTLE');

  Seats.clearCards();

  console.groupEnd();
}

export default {
  join,
  betting,
  deal,
  setState,
  settle,
};
