import { PAIR, Game, GAME_STATE, Hand, Room, S2C, Turn, Decisions } from '../../models';
import { toCard } from './card';
import { toSeatNum } from './seat';
import { DealProp, GameStateProp, GameProp, RoomProp, OptionsProp } from './prop';

export function toRoom({ id, max_bet, min_bet, history }: RoomProp): Room {
  return {
    id: Number(id),
    history: history.map(String),
    bet: {
      max: Number(max_bet),
      min: Number(min_bet),
    },
  };
}

export function toHand({ no, card, points }: DealProp): Hand {
  return {
    id: toSeatNum(no),
    card: toCard(card),
    points: Number(points),
  };
}

export function toPair(pair: number): PAIR {
  switch (pair) {
    case -1:
    case 0:
      return PAIR.L;
    case 1:
      return PAIR.R;
  }

  throw new Error(`Not support pair type: ${pair}`);
}

export function toGameState([type]: GameStateProp): GAME_STATE {
  switch (type) {
    case S2C.ROUND.BET_START:
      return GAME_STATE.BETTING;
    case S2C.ROUND.BET_END:
      return GAME_STATE.DEALING;
    case S2C.ROUND.SETTLE:
      return GAME_STATE.SETTLE;
  }

  throw new Error(`Game State not support ... ${type}`);
}

export function toTurn([, seat, pair]: GameStateProp): Turn | undefined {
  if (!seat || !pair) {
    return undefined;
  }

  return {
    seat: toSeatNum(seat),
    pair: toPair(pair),
  };
}

export function toGame({ id, round, state, max_bet, min_bet }: GameProp): Game {
  return {
    room: Number(id),
    round: String(round),
    state: toGameState(state),
    turn: toTurn(state),
    countdown: 0,
    bet: {
      max: Number(max_bet),
      min: Number(min_bet),
    },
  };
}

export function toDecision({ dbl, gvp, hit, ins, pay, spt, sty }: OptionsProp): Decisions {
  return {
    double: Boolean(dbl),
    surrender: Boolean(gvp),
    hit: Boolean(hit),
    insurance: Boolean(ins),
    pay: Boolean(pay),
    split: Boolean(spt),
    stand: Boolean(sty),
  };
}
