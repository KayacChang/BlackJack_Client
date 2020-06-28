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
  countdown: number;
  turn?: Turn;
}

export type Seats = Record<SEAT, Seat & { commited?: boolean }>;

export interface Seat {
  player: string;
  bet: number;
}

export interface Card {
  suit: SUIT;
  rank: RANK;
}

export interface Bet {
  chip: CHIP;
  amount: number;
  seat?: SEAT;
  time?: Date;
}

export interface Hand {
  id: SEAT;
  card: Card;
  points: number;
}

export interface Pair {
  action?: string;
  bet: number;
  cards: Card[];
}

export interface Decisions {
  double: boolean;
  surrender: boolean;
  hit: boolean;
  insurance: boolean;
  pay: boolean;
  split: boolean;
  stand: boolean;
}
