import { SUIT, RANK } from './poker';
import { GAME } from './service';

export * from './poker';
export * from './service';

export enum SEAT {
  DEALER = 'DEALER',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
}

export enum PAIR {
  L = 'L',
  R = 'R',
}

export interface User {
  name: string;
  balance?: number;
}

export interface Token {
  token: string;
}

export interface Room {
  id: number;
  history: string[];
  maxBet: number;
  minBet: number;
}

export interface Hand {
  id: SEAT;
  cards: Card[];
}

export interface Card {
  suit: SUIT;
  rank: RANK;
}

export interface Pair {
  action?: string;
  bet: number;
  cards: Card[];
}

export interface Seat {
  id: SEAT;
  player: string;
  totalBet: number;
}

export interface GameState {
  type: GAME;
  seat?: SEAT;
  pair?: PAIR;
}

export interface Game {
  round: string;
  state: GameState;
}
