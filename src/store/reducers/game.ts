import { Game, GAME_STATE } from '../../models';
import { GameAction, GAME } from '../types';

const initialState: Game = {
  room: 0,
  round: '',
  state: GAME_STATE.BETTING,
  bet: {
    max: 0,
    min: 0,
  },
};

export default function gameReducer(state = initialState, action: GameAction): Game {
  const { type, payload } = action;

  if ([GAME.JOIN, GAME.BET_START, GAME.BET_END, GAME.TURN, GAME.SETTLE].includes(type)) {
    const game = payload as Game;

    return {
      ...state,
      ...game,
    };
  }

  return state;
}
