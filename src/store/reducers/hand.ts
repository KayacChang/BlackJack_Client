import { Hand } from '../../models';
import { SeatAction } from '../types/seat';
import { GameAction, GAME } from '../types';

const initialState: Hand[] = [];

export default function handReducer(state = initialState, action: GameAction | SeatAction): Hand[] {
  const { type, payload } = action;

  if (type === GAME.DEAL) {
    const hands = payload as Hand[];

    return [...state, ...hands];
  }

  if (type === GAME.SETTLE) {
    return initialState;
  }

  return state;
}
