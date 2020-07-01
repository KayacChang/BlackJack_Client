import { SEAT, Seats } from '../../models';
import { SeatProp } from './prop';

export function toSeatNum(no: number): SEAT {
  if (no in SEAT) {
    return no as SEAT;
  }

  throw new Error(`Not support seat type: ${no}`);
}

export function isPlayerExist({ player }: SeatProp) {
  return Boolean(player);
}

export function toSeats(seats: SeatProp[]): Seats {
  //
  return seats.reduce((config, { no, player, total_bet, pay }) => {
    //
    config[toSeatNum(no)] = {
      player: String(player),
      bet: Number(total_bet),
      pay: Number(pay || 0),
    };

    return config;
  }, {} as Seats);
}
