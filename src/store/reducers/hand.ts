import { Hand, SEAT } from '../../models';
import { HAND, HandAction, GAME } from '../types';
import { groupBy, mergeWith, concat, pipe, map, mapObjIndexed, merge, append } from 'ramda';

const initialState: Record<SEAT, Hand[][]> = {
  [SEAT.DEALER]: [],
  [SEAT.A]: [],
  [SEAT.B]: [],
  [SEAT.C]: [],
  [SEAT.D]: [],
  [SEAT.E]: [],
};

const groupByID = groupBy(({ id }: Hand) => String(id));

export default function handReducer(state = initialState, action: HandAction): Record<SEAT, Hand[][]> {
  const { type, payload } = action;

  if (type === HAND.DEAL) {
    const hands = payload as Hand[];

    const grouped = groupByID(hands);

    return mergeWith(append, grouped, state);
  }

  if (type === GAME.BET_START) {
    return initialState;
  }

  return state;
}
