import { SUIT, RANK } from './poker';
import { GAME } from './service';

export * from './poker';
export * from './service';

export enum SEAT {
  DEALER = -1,
  A = 0,
  B = 1,
  C = 2,
  D = 3,
  E = 4,
}

export enum PAIR {
  L = 0,
  R = 1,
}

export interface User {
  name: string;
  balance?: number;
}

export interface Room {
  id: number;
  history: string[];
  maxBet: number;
  minBet: number;
}

export interface Card {
  suit: SUIT;
  rank: RANK;
}

export interface Pair {
  action: string;
  bet: number;
  cards: Card[];
}

export interface Seat {
  id: SEAT;
  player: User;
  totalBet: number;
  pairs: Pair[];
}

export interface GameState {
  type: GAME;
  seat?: SEAT;
  pair?: PAIR;
}

export interface Game {
  round: string;
  state: GameState;
  seats: Seat[];
}
