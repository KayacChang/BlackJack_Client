import { Seat } from '../../models';
import { Action } from 'redux';
import { Payload } from './base';

const PREFIX = `[SEAT]`;

export const SEAT = Object.freeze({
  ADD: `${PREFIX} ADD`,
});

type AddSeatAction = Action<typeof SEAT.ADD> & Payload<Seat[]>;

export type SeatAction = AddSeatAction;
