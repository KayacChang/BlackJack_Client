import { GAME, PAIR, Game, GameState, Hand } from '../../models';
import { toCard } from './card';
import { toSeatNum } from './seat';
import { DealProp, GameStateProp, GameProp } from './prop';
import { isNil } from 'ramda';

export function toHand({ no, cards }: DealProp): Hand {
  return {
    id: toSeatNum(no),
    cards: cards.map(toCard),
  };
}

export function toPair(pair: number): PAIR {
  const mapping: { [key: number]: PAIR } = {
    [-1]: PAIR.L,
    0: PAIR.L,
    1: PAIR.R,
  };

  if (mapping[pair]) {
    return mapping[pair];
  }

  throw new Error(`Not support pair type: ${pair}`);
}

export function toGameState([type, seat, pair]: GameStateProp): GameState {
  return {
    type: type as GAME,
    seat: !isNil(seat) ? toSeatNum(seat) : undefined,
    pair: !isNil(pair) ? toPair(pair) : undefined,
  };
}

export function toGame({ round, state }: GameProp): Game {
  return {
    round: String(round),
    state: toGameState(state),
  };
}
