import { Game } from '../../models';
import { Action } from 'redux';
import { Payload } from './base';

const PREFIX = '[GAME]';

export const GAME = Object.freeze({
  JOIN: `${PREFIX} JOIN`,
  BET_START: `${PREFIX} BET START`,
  BET_END: `${PREFIX} BET END`,
  TURN: `${PREFIX} TURN`,
  SETTLE: `${PREFIX} SETTLE`,
});

export type GameJoinAction = Action<typeof GAME.JOIN> & Payload<Game>;
export type GameBetStartAction = Action<typeof GAME.BET_START> & Payload<Game>;
export type GameBetEndAction = Action<typeof GAME.BET_END> & Payload<Game>;
export type GameSettleAction = Action<typeof GAME.SETTLE> & Payload<Game>;
export type GameTurnAction = Action<typeof GAME.TURN> & Payload<Game>;

export type GameAction = GameJoinAction | GameBetStartAction | GameBetEndAction | GameSettleAction | GameTurnAction;
