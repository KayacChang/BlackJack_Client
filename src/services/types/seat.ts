import { SEAT, Seats, PAIR } from '../../models';
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
  return seats.reduce((config, { no, player, total_bet, pay, piles }) => {
    return {
      ...config,
      [toSeatNum(no)]: {
        player: String(player),
        bet: Number(total_bet),
        split: Boolean(piles && piles[piles.length - 1].bet),
        pays: {
          [PAIR.L]: piles?.[0]?.pay || 0,
          [PAIR.R]: piles?.[1]?.pay || 0,
        },
      },
    };
  }, {} as Seats);
}
