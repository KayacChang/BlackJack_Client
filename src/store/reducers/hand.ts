import { Hand } from '../../models';
import { HAND, HandAction, GAME } from '../types';

const initialState: Hand[] = [];

export default function handReducer(state = initialState, action: HandAction): Hand[] {
  const { type, payload } = action;

  if (type === HAND.DEAL) {
    const hands = payload as Hand[];

    return hands.map((newHand) => {
      const hand = state.find((hand) => newHand.id === hand.id);

      return hand ? { ...hand, ...newHand } : newHand;
    });
  }

  if (type === GAME.BET_START) {
    return initialState;
  }

  return state;
}
