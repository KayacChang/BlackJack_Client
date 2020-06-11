import { required, mustBe } from '../utils';

const checkRequire = required(['history', 'id', 'max_bet', 'min_bet', 'occupied', 'seats_num']);
const checkType = mustBe(Number)(['id', 'max_bet', 'min_bet', 'occupied', 'seats_num']);

export default class Room {
  //
  history: string[];
  id: number;
  maxBet: number;
  minBet: number;
  numberOfPlayers: number;
  numberOfSeats: number;

  constructor(data: any) {
    //
    if (!checkRequire(data)) {
      throw new Error(`Required properties ... ${JSON.stringify(data)}`);
    }

    if (!checkType(data)) {
      throw new Error(`Properties must be number ... ${JSON.stringify(data)}`);
    }

    this.history = data.history.map(String);
    this.id = Number(data.id);
    this.maxBet = Number(data.max_bet);
    this.minBet = Number(data.min_bet);
    this.numberOfPlayers = Number(data.occupied);
    this.numberOfSeats = Number(data.seats_num);
  }
}
