import { SEAT as SEAT_ID, Bet, Seats, User } from '../../models';
import { SeatAction, SEAT, BET, BetAction, GAME } from '../types';
import { v4 } from 'uuid';

const dealer = {
  player: v4(),
  bet: 0,
  commited: false,
};

const emptySeat = () => ({
  player: '',
  bet: 0,
  commited: false,
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

    const newState = {} as Seats;

    for (const [id, seat] of Object.entries(seats)) {
      const seatID = Number(id) as SEAT_ID;

      newState[seatID] = { ...state[seatID], ...seat };
    }

    return { ...state, ...newState };
  }

  if (type === GAME.BET_START) {
    const newState = {} as Seats;

    for (const [id, seat] of Object.entries(state)) {
      newState[Number(id) as SEAT_ID] = { ...seat, commited: false };
    }

    return newState;
  }

  if (type === SEAT.CLEAR) {
    //
    return initialState;
  }

  if (type === BET.ADD) {
    const { seat, amount } = payload as Bet;

    if (seat === undefined) {
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

    if (seat === undefined) {
      return state;
    }

    const target = state[seat];

    return {
      ...state,
      [seat]: { ...target, bet: target.bet - amount },
    };
  }

  if (type === BET.COMMIT) {
    const bets = payload as Bet[];

    const newState = {} as Seats;

    for (const { seat, amount } of bets) {
      if (seat === undefined) continue;

      if (!newState[seat]) {
        newState[seat] = { ...state[seat] };
      }

      if (!newState[seat].commited) {
        newState[seat].commited = amount > 0;
      }
    }

    return {
      ...state,
      ...newState,
    };
  }

  if (type === BET.CLEAR) {
    const { name } = payload as User;

    const newState = {} as Seats;
    for (const [id, seat] of Object.entries(state)) {
      if (seat.player !== name) {
        continue;
      }

      if (seat.commited) {
        continue;
      }

      const seatID = Number(id) as SEAT_ID;

      if (!newState[seatID]) {
        newState[seatID] = { ...state[seatID] };
      }

      newState[seatID].bet = 0;
    }

    return {
      ...state,
      ...newState,
    };
  }

  if (type === BET.REPLACE) {
    const bets = payload as Bet[];

    const newState = {} as Seats;

    for (const { seat, amount } of bets) {
      if (seat === undefined) continue;

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
