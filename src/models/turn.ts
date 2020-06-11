import { PAIR, SEAT, Turn } from './type';

export default function toTurn(seat: any, pair: any): Turn {
  //
  switch (seat) {
    case -1:
      seat = SEAT.DEALER;
      break;
    case 0:
      seat = SEAT.A;
      break;
    case 1:
      seat = SEAT.B;
      break;
    case 2:
      seat = SEAT.C;
      break;
    case 3:
      seat = SEAT.D;
      break;
    case 4:
      seat = SEAT.E;
      break;
    default:
      throw new Error(`Turn: seat must in ${[-1, 0, 1, 2, 3, 4]} but ... ${seat}`);
  }

  switch (pair) {
    case -1:
      pair = PAIR.L;
      break;
    case 0:
      pair = PAIR.L;
      break;
    case 1:
      pair = PAIR.R;
      break;
    default:
      throw new Error(`Turn: pair must in ${[-1, 0, 1]} but ... ${pair}`);
  }

  return {
    seat,
    pair,
  };
}
