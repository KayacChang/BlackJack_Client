import { GAME as GAME_STATE, SEAT, PAIR, Game } from '../../models';
import { GameAction, GAME, GameWithSeats } from '../types';

const initialState: Game = {
  round: '',
  state: {
    type: GAME_STATE.BETTING,
    seat: SEAT.DEALER,
    pair: PAIR.L,
  },
};

export default function game(state = initialState, action: GameAction): Game {
  const { type, payload } = action;

  if ([GAME.JOIN, GAME.SETTLE].includes(type)) {
    const { game } = payload as GameWithSeats;

    return {
      ...state,
      ...game,
    };
  }

  if ([GAME.BETTING, GAME.BET_END].includes(type)) {
    const game = payload as Game;

    return {
      ...state,
      ...game,
    };
  }

  return state;
}
