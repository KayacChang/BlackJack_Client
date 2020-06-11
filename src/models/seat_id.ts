import { SEAT } from '../constants';

export default function SeatID(seat: any) {
  switch (seat) {
    case -1:
      return SEAT.DEALER;
    case 0:
      return SEAT.A;
    case 1:
      return SEAT.B;
    case 2:
      return SEAT.C;
    case 3:
      return SEAT.D;
    case 4:
      return SEAT.E;
    default:
      throw new Error(`Turn: seat must in ${[-1, 0, 1, 2, 3, 4]} but ... ${seat}`);
  }
}
