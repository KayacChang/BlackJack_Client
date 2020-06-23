import { Action } from 'redux';
import { Payload } from './base';
import { Bet } from '../../models';

const PREFIX = '[BET]';

export const BET = Object.freeze({
  CHOOSE: `${PREFIX} CHOOSE`,
  ADD: `${PREFIX} ADD`,
  UNDO: `${PREFIX} UNDO`,
  CLEAR: `${PREFIX} CLEAR`,
  COMMIT: `${PREFIX} COMMIT`,
});

export type ChooseAction = Action<typeof BET.CHOOSE> & Payload<Bet>;
export type AddBetAction = Action<typeof BET.ADD> & Payload<Bet>;
export type UndoBetAction = Action<typeof BET.UNDO> & Payload<undefined>;
export type ClearBetAction = Action<typeof BET.CLEAR> & Payload<undefined>;
export type CommitBetAction = Action<typeof BET.COMMIT> & Payload<Bet[]>;

export type BetAction = ChooseAction | AddBetAction | UndoBetAction | ClearBetAction | CommitBetAction;
