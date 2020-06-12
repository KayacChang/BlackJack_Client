import { Action } from '../types';
import { Game } from '../../models';

export enum GAME_ACTION {
  JOIN = 'JOIN_GAME',
}

export interface JoinGameAction extends Action<Game> {
  type: typeof GAME_ACTION.JOIN;
  payload: Game;
}

export type GameAction = JoinGameAction;
