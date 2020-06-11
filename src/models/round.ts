import { required } from '../utils';
import { Round, RoundState, GAME } from './type';
import toTurn from './turn';

const checkRequire = required(['round', 'seats', 'state', 'shoe_num']);

export default function toRound(data: any): Round {
  //
  if (!checkRequire(data)) {
    throw new Error(`Required properties ... ${JSON.stringify(data)}`);
  }

  return {
    id: String(data.round),
    shoe: Number(data.shoe_num),
    state: toRoundState(data.state),
    seats: data.seats,
  };
}

function toRoundState([type, seat, pair]: number[]): RoundState {
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
    ...toTurn(seat, pair),
  };
}
