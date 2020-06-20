import { Action } from 'redux';
import { Payload } from './base';
import { CHIP } from '../../models';

const PREFIX = '[BET]';

export const BET = Object.freeze({
  CHOOSE: `${PREFIX} CHOOSE`,
  ADD: `${PREFIX} ADD`,
  CLEAR: `${PREFIX} CLEAR`,
});

export type ChooseAction = Action<typeof BET.CHOOSE> & Payload<{ chip: CHIP }>;

export type BetAction = ChooseAction;
