import { Seat } from '../../models';
import { SeatAction, SEAT } from '../types';

export function updateSeats(payload: Seat[]): SeatAction {
  return { type: SEAT.UPDATE, payload };
}

export function clearSeats(): SeatAction {
  return { type: SEAT.CLEAR, payload: [] };
}
