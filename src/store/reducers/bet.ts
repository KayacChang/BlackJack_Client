import { Bet, CHIP } from '../../models';
import { BetAction, BET } from '../types';

type BetState = {
  chosen?: CHIP;
  chips: Bet[];
};

const initialState: BetState = {
  chips: [],
};

export default function betReducer(state = initialState, action: BetAction): BetState {
  const { type, payload } = action;

  if (type === BET.CHOOSE) {
    const { chip } = payload;

    return { ...state, chosen: chip };
  }

  return state;
}
