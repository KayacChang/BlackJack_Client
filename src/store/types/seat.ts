import { Action } from './base';
import { Seat } from '../../models';

export enum SEAT {
  ADD = 'ADD_SEAT',
}

export interface AddSeatAction extends Action<Seat> {
  type: typeof SEAT.ADD;
  payload: Seat;
}

export type SeatAction = AddSeatAction;
