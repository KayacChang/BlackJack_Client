import { Action } from '../types';
import { Game, GameState, Seat } from '../../models';

export enum GAME_ACTION {
  JOIN = 'JOIN_GAME',
  BETTING = 'GAME_BETTING',
  BET_END = 'GAME_BET_END',
  SETTLE = 'GAME_SETTLE',
}

export interface JoinGameAction extends Action<Game> {
  type: typeof GAME_ACTION.JOIN;
  payload: Game;
}

export interface GameBettingAction extends Action<Game> {
  type: typeof GAME_ACTION.BETTING;
  payload: Game;
}

export interface GameBetEndAction extends Action<GameState> {
  type: typeof GAME_ACTION.BET_END;
  payload: GameState;
}

export interface GameSettleAction extends Action<Seat[]> {
  type: typeof GAME_ACTION.SETTLE;
  payload: Seat[];
}

export type GameAction = JoinGameAction | GameBettingAction | GameBetEndAction | GameSettleAction;
