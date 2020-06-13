import { GAME, SEAT, PAIR, Seat, Game } from '../../models';
import { GameAction, GAME_ACTION } from './types';

const dealer: Seat = {
  id: SEAT.DEALER,
  player: {
    name: 'dealer',
  },
  totalBet: 0,
  pairs: [],
};

const initialState: Game = {
  round: '',
  state: {
    type: GAME.BETTING,
    seat: SEAT.DEALER,
    pair: PAIR.L,
  },
  seats: [dealer],
};

export * from './types';
export * from './actions';

export default function game(state = initialState, action: GameAction): Game {
  const { type, payload } = action;

  if (type === GAME_ACTION.JOIN) {
    const game = payload as Game;

    game.seats = [dealer, ...game.seats];

    return {
      ...state,
      ...game,
    };
  }

  return state;
}
