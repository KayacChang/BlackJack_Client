import { SEAT as SEAT_ID, Seat, Bet, Seats } from '../../models';
import { SeatAction, SEAT, BET, BetAction } from '../types';

const dealer: Seat = {
  player: 'dealer',
  bet: 0,
};

const initialState: Seats = {
  [SEAT_ID.DEALER]: dealer,
  [SEAT_ID.A]: undefined,
  [SEAT_ID.B]: undefined,
  [SEAT_ID.C]: undefined,
  [SEAT_ID.D]: undefined,
  [SEAT_ID.E]: undefined,
};

export default function seatReducer(state = initialState, action: SeatAction | BetAction): Seats {
  const { type, payload } = action;

  if (type === SEAT.UPDATE) {
    const seats = payload as Seats;

    return { ...state, ...seats };
  }

  if (type === SEAT.CLEAR) {
    //
    return initialState;
  }

  if (type === BET.ADD) {
    const { seat, amount } = payload as Bet;

    const target = state[seat];
    if (!target) {
      throw new Error(`Seat ${seat} not existed...`);
    }

    return {
      ...state,
      [seat]: { ...target, bet: target.bet + amount },
    };
  }

  if (type === BET.UNDO) {
    const { seat, amount } = payload as Bet;

    const target = state[seat];
    if (!target) {
      throw new Error(`Seat ${seat} not existed...`);
    }

    return {
      ...state,
      [seat]: { ...target, bet: target.bet - amount },
    };
  }

  return state;
}
