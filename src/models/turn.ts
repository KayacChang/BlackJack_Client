import SeatID from './seat_id';
import { SEAT, PAIR } from '../constants';

export default class Turn {
  seat: SEAT;
  pair: PAIR;

  constructor(seat: any, pair: any) {
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

    this.seat = SeatID(seat);
    this.pair = pair;
  }
}
