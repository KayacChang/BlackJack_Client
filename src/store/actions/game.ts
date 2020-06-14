import { Game } from '../../models';
import { GAME, GameAction } from '../types';

export function join(payload: Game): GameAction {
  return { type: GAME.JOIN, payload };
}

export function betting(payload: Game): GameAction {
  return { type: GAME.BETTING, payload };
}

export function betend(payload: Game): GameAction {
  return { type: GAME.BET_END, payload };
}

export function settle(payload: Game): GameAction {
  return { type: GAME.SETTLE, payload };
}

export function deal(payload: Game): GameAction {
  return { type: GAME.DEAL, payload };
}

export function turn(payload: Game): GameAction {
  return { type: GAME.TURN, payload };
}
