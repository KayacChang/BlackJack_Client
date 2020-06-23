import { Range } from './base';
import { SEAT, PAIR, GAME_STATE, SUIT, RANK, CHIP } from './enum';

export interface Turn {
  seat: SEAT;
  pair: PAIR;
}

export interface Game {
  room: number;
  round: string;

  bet: Range;
  state: GAME_STATE;

  turn?: Turn;
}

export interface Seat {
  id: SEAT;
  player: string;
  totalBet: number;
}

export interface Card {
  suit: SUIT;
  rank: RANK;
}

//

export interface Bet {
  chip: CHIP;
  amount: number;
  seat?: SEAT;
  time?: Date;
}

export interface Hand {
  id: SEAT;
  cards: Card[];
}

export interface Pair {
  action?: string;
  bet: number;
  cards: Card[];
}
