import { BetAction, BET } from '../types';
import { CHIP } from '../../models';

export function choose(payload: { chip: CHIP }): BetAction {
  return { type: BET.CHOOSE, payload };
}
