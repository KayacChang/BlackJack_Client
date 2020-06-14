import { SEAT, Seat } from '../../models';
import { SeatProp, GameProp } from './prop';

export function toSeatNum(no: number): SEAT {
  const mapping: { [key: number]: SEAT } = {
    [-1]: SEAT.DEALER,
    0: SEAT.A,
    1: SEAT.B,
    2: SEAT.C,
    3: SEAT.D,
    4: SEAT.E,
  };

  if (mapping[no]) {
    return mapping[no];
  }

  throw new Error(`Not support seat type: ${no}`);
}

export function toSeat({ no, player, total_bet }: SeatProp): Seat {
  return {
    id: toSeatNum(no),
    player: String(player),
    totalBet: Number(total_bet),
  };
}

export function isPlayerExist({ player }: SeatProp) {
  return Boolean(player);
}

export function toSeats({ seats }: GameProp) {
  return seats.filter(isPlayerExist).map(toSeat);
}
