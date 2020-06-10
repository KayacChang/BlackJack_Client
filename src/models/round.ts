import { required } from '../utils';
import { Round, RoundState, SERVER, PAIR, SEAT } from './type';

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

const allState = [SERVER.NEW_ROUND, SERVER.GAME_START, SERVER.GAME_SETTLE];

function toRoundState([type, seat, pair]: number[]): RoundState {
  //
  if (!allState.includes(type)) {
    throw new Error(`RoundState: type must in ${allState} but ... ${type}`);
  }

  if (type === SERVER.NEW_ROUND || type === SERVER.GAME_SETTLE) {
    return { type };
  }

  switch (seat) {
    case -1:
      seat = SEAT.DEALER;
      break;
    case 0:
      seat = SEAT.A;
      break;
    case 1:
      seat = SEAT.B;
      break;
    case 2:
      seat = SEAT.C;
      break;
    case 3:
      seat = SEAT.D;
      break;
    case 4:
      seat = SEAT.E;
      break;
    default:
      throw new Error(`RoundState: seat must in ${[-1, 0, 1, 2, 3, 4]} but ... ${seat}`);
  }

  switch (pair) {
    case -1:
      pair = PAIR.L;
      break;
    case 0:
      pair = PAIR.L;
      break;
    case 1:
      pair = PAIR.R;
      break;
    default:
      throw new Error(`RoundState: pair must in ${[-1, 0, 1]} but ... ${pair}`);
  }

  return {
    type,
    seat,
    pair,
  };
}
