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
  id: number;
  name: string;
}

export interface Room {
  id: number;
  history: string[];
  maxBet: number;
  minBet: number;
}
