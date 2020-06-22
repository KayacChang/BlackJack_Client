import { SEAT as SEAT_ID, Seat, Bet } from '../../models';
import { SeatAction, SEAT, BET, BetAction } from '../types';

const dealer: Seat = {
  id: SEAT_ID.DEALER,
  player: 'dealer',
  totalBet: 0,
};

const initialState: Seat[] = [dealer];

export default function seatReducer(state = initialState, action: SeatAction | BetAction): Seat[] {
  const { type, payload } = action;

  if (type === SEAT.UPDATE) {
    const seats = payload as Seat[];

    return seats;
  }

  if (type === BET.ADD) {
    const { seat, amount } = payload as Bet;

    return state.map(({ id, player, totalBet }) => {
      //
      if (id === seat) {
        return { id, player, totalBet: totalBet + amount };
      }

      return { id, player, totalBet };
    });
  }

  return state;
}
