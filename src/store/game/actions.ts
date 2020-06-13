import { Game, GAME, SEAT, PAIR, Seat } from '../../models';
import { GAME_ACTION, GameAction } from './types';

interface SeatProp {
  no: number;
  player: string;
  total_bet: number;
}

function toSeat({ no, player, total_bet }: SeatProp): Seat {
  return {
    id: Number(no),
    player: {
      name: String(player),
    },
    totalBet: Number(total_bet),
    pairs: [],
  };
}

interface GameProp {
  round: string;
  state: [number, number?, number?];
  seats: SeatProp[];
}

function toGame({ round, state, seats }: GameProp): Game {
  return {
    round: String(round),
    state: {
      type: state[0] as GAME,
      seat: state[1] as SEAT,
      pair: state[2] as PAIR,
    },
    seats: seats.filter(({ player }) => Boolean(player)).map(toSeat),
  };
}

export function joinGame(prop: GameProp): GameAction {
  return {
    type: GAME_ACTION.JOIN,
    payload: toGame(prop),
  };
}

export function betting(prop: GameProp): GameAction {
  return {
    type: GAME_ACTION.BETTING,
    payload: toGame({
      ...prop,
      state: [GAME.BETTING],
    }),
  };
}

export function betend({ state }: GameProp): GameAction {
  return {
    type: GAME_ACTION.BET_END,
    payload: {
      type: state[0] as GAME,
      seat: state[1] as SEAT,
      pair: state[2] as PAIR,
    },
  };
}

export function settle({ seats }: GameProp): GameAction {
  return {
    type: GAME_ACTION.SETTLE,
    payload: seats.filter(({ player }) => Boolean(player)).map(toSeat),
  };
}
