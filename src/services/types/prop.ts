export interface SeatProp {
  no: number;
  player: string;
  total_bet: number;
}

export type GameStateProp = [number, number?, number?];

export interface GameProp {
  round: string;
  state: GameStateProp;
  seats: SeatProp[];
  shoe_num: number;
}

export interface DealProp {
  card: string;
  cards: string[];
  no: number;
  pile: number;
  points: number;
  shoe_num: number;
}

export interface LoginProp {
  user_name: string;
}

export interface UpdateProp {
  name: string;
  balance: number;
}

export interface TurnProp {
  no: number;
  pile: number;
}
