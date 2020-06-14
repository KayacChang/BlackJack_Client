import { HandAction, HAND } from '../types';
import { Hand } from '../../models';

export function dealCard(...hands: Hand[]): HandAction {
  return { type: HAND.DEAL, payload: hands };
}
