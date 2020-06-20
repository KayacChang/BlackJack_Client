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
  L = 'L',
  R = 'R',
}

export enum CHIP {
  RED,
  GREEN,
  BLUE,
  BLACK,
  PURPLE,
  YELLOW,
}

export interface Bet {
  type: CHIP;
  seat: SEAT;
  amount: number;
}

export interface User {
  name: string;
  balance: number;
  totalBet: number;
}

export interface Token {
  token: string;
  game_token?: string;
  game_id?: string;
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
  room: number;
  round: string;
  state: GameState;
  maxBet: number;
  minBet: number;
}

export interface Vec2 {
  x: number;
  y: number;
}
