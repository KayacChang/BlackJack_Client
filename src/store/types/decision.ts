import { Decisions } from '../../models';
import { Action } from 'redux';
import { Payload } from './base';

const PREFIX = '[DECISION]';

export const DECISION = Object.freeze({
  UPDATE: `${PREFIX} UPDATE`,
});

export type DecisionUpdateAction = Action<typeof DECISION.UPDATE> & Payload<Decisions>;

export type DecisionAction = DecisionUpdateAction;
