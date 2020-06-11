export enum CLIENT {
  LOGIN = 8003150,
  JOIN_ROOM = 8003103,
}

export enum SERVER {
  LOGIN = 8003050,
  INFO = 8003095,
  LOBBY = 8003001,
  UPDATE_LOBBY = 8003002,
  JOIN_ROOM = 8003003,
}

export enum GAME {
  BETTING = 8003020,
  BET_END = 8003021,
  BEGIN = 8003036,
  TURN = 8003034,
  DEAL = 8003033,
  SETTLE = 8003022,
}

export interface Room {
  history: string[];
  id: number;
  maxBet: number;
  minBet: number;
  numberOfPlayers: number;
  numberOfSeats: number;
}

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

export type Turn = {
  seat: SEAT;
  pair: PAIR;
};

export type RoundState =
  | {
      type: GAME.BETTING | GAME.BET_END | GAME.SETTLE;
    }
  | Turn;

export interface Round {
  id: string;
  shoe: number;
  state: RoundState;
  seats: any[];
}

export interface User {
  id: number;
  name: string;
}

export interface Token {
  token: string;
  gameID: string;
  gameToken: string;
}
