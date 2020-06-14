import { Action } from './base';
import { Game, Seat } from '../../models';

const PREFIX = '[GAME]';

export const GAME = Object.freeze({
  JOIN: `${PREFIX} JOIN`,
  BETTING: `${PREFIX} BETTING`,
  BET_END: `${PREFIX} BET_END`,
  SETTLE: `${PREFIX} SETTLE`,
  BEGIN: `${PREFIX} BEGIN`,
});

export interface GameWithSeats {
  game: Game;
  seats: Seat[];
}

export interface JoinGameAction extends Action<GameWithSeats> {
  type: typeof GAME.JOIN;
  payload: GameWithSeats;
}

export interface GameBettingAction extends Action<Game> {
  type: typeof GAME.BETTING;
  payload: Game;
}

export interface GameBetEndAction extends Action<Game> {
  type: typeof GAME.BET_END;
  payload: Game;
}

export interface GameSettleAction extends Action<GameWithSeats> {
  type: typeof GAME.SETTLE;
  payload: GameWithSeats;
}

export interface GameBeginAction extends Action<Seat[]> {
  type: typeof GAME.BEGIN;
  payload: Seat[];
}

export type GameAction = JoinGameAction | GameBettingAction | GameBetEndAction | GameSettleAction | GameBeginAction;
