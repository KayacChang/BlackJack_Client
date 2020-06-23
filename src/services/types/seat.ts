import { SEAT, Seat, Seats } from '../../models';
import { SeatProp } from './prop';

export function toSeatNum(no: number): SEAT {
  if (no in SEAT) {
    return no as SEAT;
  }

  throw new Error(`Not support seat type: ${no}`);
}

export function toSeat({ player, total_bet }: SeatProp): Seat {
  return {
    player: String(player),
    bet: Number(total_bet),
  };
}

export function isPlayerExist({ player }: SeatProp) {
  return Boolean(player);
}

export function toSeats(seats: SeatProp[]): Seats {
  //
  return seats.reduce((config, { no, player, total_bet }) => {
    //
    config[toSeatNum(no)] = toSeat({ no, player, total_bet });

    return config;
  }, {} as Seats);
}
