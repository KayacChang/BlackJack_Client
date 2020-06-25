import { SEAT as SEAT_ID, Seat, Bet, Seats, User } from '../../models';
import { SeatAction, SEAT, BET, BetAction } from '../types';
import { v4 } from 'uuid';
import { mapObjIndexed } from 'ramda';

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

  if (type === BET.CLEAR) {
    const { name } = payload as User;

    const newState = mapObjIndexed((seat) => (seat.player === name ? ((seat.bet = 0), seat) : seat), state);

    return {
      ...state,
      ...newState,
    };
  }

  if (type === BET.REPLACE) {
    const bets = payload as Bet[];

    const newState = {} as Seats;

    for (const { seat, amount } of bets) {
      if (!seat) continue;

      if (!newState[seat]) {
        newState[seat] = { ...state[seat], bet: 0 };
      }

      newState[seat].bet += amount;
    }

    return {
      ...state,
      ...newState,
    };
  }

  return state;
}
