import { required } from '../utils';
import Seat from './seat';
import { GAME } from '../constants';
import Turn from './turn';
import { construct } from 'ramda';

const toSeat = construct(Seat);
const checkRequire = required(['round', 'seats', 'state', 'shoe_num']);

export default class Round {
  id: string;
  shoe: number;
  state: State | Turn;
  seats: Seat[];

  constructor(data: any) {
    if (!checkRequire(data)) {
      throw new Error(`Required properties ... ${JSON.stringify(data)}`);
    }

    this.id = String(data.round);
    this.shoe = Number(data.shoe_num);
    this.state = toState(data.state);
    this.seats = data.seats.map(toSeat);
  }
}

type State = {
  type: GAME.BETTING | GAME.BET_END | GAME.SETTLE;
};

function toState([type, seat, pair]: number[]): State {
  //
  const allState = [GAME.BETTING, GAME.BET_END, GAME.SETTLE];

  if (!allState.includes(type)) {
    throw new Error(`RoundState: type must in ${allState} but ... ${type}`);
  }

  if (type === GAME.BETTING || type === GAME.SETTLE) {
    return { type };
  }

  return {
    type,
    ...new Turn(seat, pair),
  };
}
