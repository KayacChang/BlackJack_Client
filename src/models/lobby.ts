import { Range } from './base';

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
  bet: Range;
}
