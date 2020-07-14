import { Range } from './base';
import { DECISION } from './enum';

export interface User {
  name: string;
  balance: number;
  totalBet: number;
  decisions: DECISION[];
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
  people: number;
}
