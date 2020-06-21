import { Bet } from '../../models';
import { BetAction, BET } from '../types';

type BetState = {
  chosen?: Bet;
  history: Bet[];
};

const initialState: BetState = {
  history: [],
};

export default function betReducer(state = initialState, action: BetAction): BetState {
  const { type, payload } = action;

  if (type === BET.CHOOSE) {
    const bet = payload as Bet;

    return { ...state, chosen: bet };
  }

  if (type === BET.ADD) {
    const bet = payload as Bet;

    return { ...state, history: [...state.history, bet] };
  }

  return state;
}
