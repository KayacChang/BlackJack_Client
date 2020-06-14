import { SEAT, Seat } from '../../models';
import { SeatAction } from '../types/seat';

const dealer: Seat = {
  id: SEAT.DEALER,
  player: 'dealer',
  totalBet: 0,
};

const initialState: Seat[] = [dealer];

export default function seatReducer(state = initialState, action: SeatAction): Seat[] {
  const { type, payload } = action;

  return state;
}
