import { GAME as GAME_STATE, SEAT, PAIR, Game } from '../../models';
import { GameAction, GAME } from '../types';

const initialState: Game = {
  room: 0,
  round: '',
  state: {
    type: GAME_STATE.BETTING,
    seat: SEAT.DEALER,
    pair: PAIR.L,
  },
};

export default function gameReducer(state = initialState, action: GameAction): Game {
  const { type, payload } = action;

  if ([GAME.JOIN, GAME.SETTLE, GAME.BET_START, GAME.BET_END, GAME.TURN].includes(type)) {
    const game = payload as Game;

    return {
      ...state,
      ...game,
    };
  }

  return state;
}
