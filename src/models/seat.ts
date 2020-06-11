import { required } from '../utils';
import SeatID from './seat_id';
import User from './user';
import { SEAT } from '../constants';

const checkRequire = required(['no', 'player', 'total_bet']);

export default class Seat {
  id: SEAT;
  player: User;
  bet: number;

  constructor(data: any) {
    if (!checkRequire(data)) {
      throw new Error(`Required properties ... ${JSON.stringify(data)}`);
    }

    this.id = SeatID(data.no);
    this.player = new User(data.player);
    this.bet = Number(data.total_bet);
  }
}
