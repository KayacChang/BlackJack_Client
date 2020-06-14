import { GAME, PAIR, Game, GameState, Hand } from '../../models';
import { toCard } from './card';
import { toSeatNum } from './seat';
import { DealProp, GameStateProp, GameProp } from './prop';

export function toHand({ no, cards }: DealProp): Hand {
  return {
    id: toSeatNum(no),
    cards: cards.map(toCard),
  };
}

export function toGameState([type, seat, pair]: GameStateProp): GameState {
  return {
    type: type as GAME,
    seat: seat ? toSeatNum(seat) : undefined,
    pair: pair as PAIR,
  };
}

export function toGame({ round, state }: GameProp): Game {
  return {
    round: String(round),
    state: toGameState(state),
  };
}
