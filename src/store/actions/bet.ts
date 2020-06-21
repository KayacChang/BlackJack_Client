import { BetAction, BET } from '../types';
import { Bet } from '../../models';

export function choose(payload: Bet): BetAction {
  return { type: BET.CHOOSE, payload };
}

export function addBet(payload: Bet): BetAction {
  return { type: BET.ADD, payload };
}
