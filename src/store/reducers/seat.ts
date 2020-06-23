import { SEAT as SEAT_ID, Seat, Bet, Seats } from '../../models';
import { SeatAction, SEAT, BET, BetAction } from '../types';
import { v4 } from 'uuid';

const dealer: Seat = {
  player: v4(),
  bet: 0,
};

const emptySeat = () => ({
  player: '',
  bet: 0,
});

const initialState: Seats = {
  [SEAT_ID.DEALER]: dealer,
  [SEAT_ID.A]: emptySeat(),
  [SEAT_ID.B]: emptySeat(),
  [SEAT_ID.C]: emptySeat(),
  [SEAT_ID.D]: emptySeat(),
  [SEAT_ID.E]: emptySeat(),
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

    if (!seat) {
      return state;
    }

    const target = state[seat];

    return {
      ...state,
      [seat]: { ...target, bet: target.bet + amount },
    };
  }

  if (type === BET.UNDO) {
    const { seat, amount } = payload as Bet;

    if (!seat) {
      return state;
    }

    const target = state[seat];

    return {
      ...state,
      [seat]: { ...target, bet: target.bet - amount },
    };
  }

  return state;
}
