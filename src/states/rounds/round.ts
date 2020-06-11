import { Round, Seat, Props } from './type';
import { GAME, PAIR, SEAT } from '../../constants';

function State(type: any) {
  //
  const allState = [GAME.BETTING, GAME.BET_END, GAME.SETTLE];

  if (!allState.includes(type)) {
    throw new Error(`RoundState: type must in ${allState} but ... ${type}`);
  }

  return type;
}

function Pair(pair: any): PAIR {
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
      throw new Error(`Turn: pair must in ${[-1, 0, 1]} but ... ${pair}`);
  }

  return pair;
}

function SeatID(seat: any): SEAT {
  switch (seat) {
    case -1:
      return SEAT.DEALER;
    case 0:
      return SEAT.A;
    case 1:
      return SEAT.B;
    case 2:
      return SEAT.C;
    case 3:
      return SEAT.D;
    case 4:
      return SEAT.E;
    default:
      throw new Error(`Turn: seat must in ${[-1, 0, 1, 2, 3, 4]} but ... ${seat}`);
  }
}

function newSeat({ no, player, total_bet }: any): Seat | undefined {
  //
  if (!player) {
    return;
  }

  return {
    id: SeatID(no),
    player: String(player),
    bet: Number(total_bet),
  };
}

export default function newRound({ round, shoe_num, state, seats }: Props): Round {
  //
  return {
    id: String(round),
    seats: seats.map(newSeat).filter(Boolean),
    shoe: Number(shoe_num),
    state: {
      type: State(state[0]),
      seat: state[1] ? SeatID(state[1]) : SEAT.DEALER,
      pair: state[2] ? Pair(state[2]) : PAIR.L,
    },
  };
}
