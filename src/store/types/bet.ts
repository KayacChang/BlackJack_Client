import { Action } from 'redux';
import { Payload } from './base';
import { Bet } from '../../models';

const PREFIX = '[BET]';

export const BET = Object.freeze({
  CHOOSE: `${PREFIX} CHOOSE`,
  ADD: `${PREFIX} ADD`,
  CLEAR: `${PREFIX} CLEAR`,
});

export type ChooseAction = Action<typeof BET.CHOOSE> & Payload<Bet>;
export type AddBetAction = Action<typeof BET.ADD> & Payload<Bet>;
export type ClearBetAction = Action<typeof BET.CLEAR> & Payload<undefined>;

export type BetAction = ChooseAction | AddBetAction | ClearBetAction;
