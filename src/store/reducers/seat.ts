import { SEAT, Seat } from '../../models';
import { SeatAction } from '../types/seat';
import { GAME, GameWithSeats, GameAction } from '../types';

const dealer: Seat = {
  id: SEAT.DEALER,
  player: 'dealer',
  totalBet: 0,
};

const initialState: Seat[] = [dealer];

export default function seatReducer(state = initialState, action: GameAction | SeatAction): Seat[] {
  const { type, payload } = action;

  if (type === GAME.JOIN) {
    const { seats } = payload as GameWithSeats;

    return [...state, ...seats];
  }

  return state;
}
