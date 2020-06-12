import { Game, GAME, SEAT, PAIR, Seat } from '../../models';
import { GAME_ACTION, JoinGameAction } from './types';

interface SeatProp {
  no: number;
  player: string;
  total_bet: number;
}

interface GameProp {
  round: string;
  state: [number, number?, number?];
  seats: SeatProp[];
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

export function joinGame(prop: GameProp): JoinGameAction {
  return {
    type: GAME_ACTION.JOIN,
    payload: toGame(prop),
  };
}
