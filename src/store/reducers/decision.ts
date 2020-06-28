import { Decisions } from '../../models';
import { DecisionAction, DECISION } from '../types/decision';

const initialState: Decisions = {
  double: false,
  surrender: false,
  hit: false,
  insurance: false,
  pay: false,
  split: false,
  stand: false,
};

export default function userReducer(state = initialState, action: DecisionAction): Decisions {
  const { type, payload } = action;

  if (type === DECISION.UPDATE) {
    return payload as Decisions;
  }

  return state;
}
