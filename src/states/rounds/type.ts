import { GAME, SEAT, PAIR } from '../../constants';

export type State = {
  type: GAME.BETTING | GAME.BET_END | GAME.SETTLE;
  seat: SEAT;
  pair: PAIR;
};

export type Props = {
  round: any;
  shoe_num: any;
  state: [GAME, SEAT?, PAIR?];
  seats: any[];
};

export type Round = {
  id: string;
  shoe: number;
  state: State;
  seats: (Seat | undefined)[];
};

export type Seat = {
  id: SEAT;
  player: string;
  bet: number;
};
