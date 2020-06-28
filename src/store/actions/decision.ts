import { DecisionAction, DECISION } from '../types';
import { Decisions } from '../../models';

export function updateDecision(payload: Decisions): DecisionAction {
  return {
    type: DECISION.UPDATE,
    payload,
  };
}
