import { Hand } from '../../models';
import { Action } from 'redux';
import { Payload } from './base';

const PREFIX = '[HAND]';

export const HAND = Object.freeze({
  DEAL: `${PREFIX} DEAL`,
});

export type HandDealAction = Action<typeof HAND.DEAL> & Payload<Hand[]>;

export type HandAction = HandDealAction;
