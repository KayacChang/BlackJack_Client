import { Action } from './base';
import { Game, Seat, Hand } from '../../models';

const PREFIX = '[GAME]';

export const GAME = Object.freeze({
  JOIN: `${PREFIX} JOIN`,
  BETTING: `${PREFIX} BETTING`,
  BET_END: `${PREFIX} BET_END`,
  SETTLE: `${PREFIX} SETTLE`,
  DEAL: `${PREFIX} DEAL`,
  TURN: `${PREFIX} TURN`,
});

export interface GameWithSeats {
  game: Game;
  seats: Seat[];
}

export interface GameJoinAction extends Action<GameWithSeats> {
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

export interface GameDealAction extends Action<Hand[]> {
  type: typeof GAME.DEAL;
  payload: Hand[];
}

interface GameTurnAction extends Action<Game> {
  type: typeof GAME.TURN;
  payload: Game;
}

export type GameAction =
  | GameJoinAction
  | GameBettingAction
  | GameBetEndAction
  | GameSettleAction
  | GameDealAction
  | GameTurnAction;
