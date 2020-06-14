import { Game } from '../../models';
import { GAME, GameAction, GameWithSeats } from '../types';

export function joinGame(payload: GameWithSeats): GameAction {
  return { type: GAME.JOIN, payload };
}

export function betting(payload: Game): GameAction {
  return { type: GAME.BETTING, payload };
}

export function betend(payload: Game): GameAction {
  return { type: GAME.BET_END, payload };
}

export function settle(payload: GameWithSeats): GameAction {
  return { type: GAME.SETTLE, payload };
}