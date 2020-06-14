import { Seat } from '../../models';
import { SeatAction, SEAT } from '../types';

export function addSeats(payload: Seat[]): SeatAction {
  return { type: SEAT.ADD, payload };
}
