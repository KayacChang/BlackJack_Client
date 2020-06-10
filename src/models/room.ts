import { required, mustBe } from '../utils';

export interface Room {
  history: string[];
  id: number;
  maxBet: number;
  minBet: number;
  numberOfPlayers: number;
  numberOfSeats: number;
}

const checkRequire = required(['history', 'id', 'max_bet', 'min_bet', 'occupied', 'seats_num']);
const checkType = mustBe(Number)(['id', 'max_bet', 'min_bet', 'occupied', 'seats_num']);

export default function (data: any): Room {
  //
  if (!checkRequire(data)) {
    throw new Error(`Required properties ... ${JSON.stringify(data)}`);
  }

  if (!checkType(data)) {
    throw new Error(`Properties must be number ... ${JSON.stringify(data)}`);
  }

  return {
    history: data.history.map(String),
    id: Number(data.id),
    maxBet: Number(data.max_bet),
    minBet: Number(data.min_bet),
    numberOfPlayers: Number(data.occupied),
    numberOfSeats: Number(data.seats_num),
  };
}
