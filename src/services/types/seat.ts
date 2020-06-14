import { SEAT, Seat } from '../../models';
import { SeatProp, GameProp } from './prop';

export function toSeatNum(no: number): SEAT {
  if (no in SEAT) {
    return no as SEAT;
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
