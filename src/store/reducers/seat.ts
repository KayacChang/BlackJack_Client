import { SEAT as SEAT_ID, Seat } from '../../models';
import { SeatAction, SEAT, UserAction } from '../types';

const dealer: Seat = {
  id: SEAT_ID.DEALER,
  player: 'dealer',
  totalBet: 0,
};

const initialState: Seat[] = [dealer];

export default function seatReducer(state = initialState, action: SeatAction | UserAction): Seat[] {
  const { type, payload } = action;

  if (type === SEAT.ADD) {
    const seats = payload as Seat[];

    return [...state, ...seats];
  }

  return state;
}
