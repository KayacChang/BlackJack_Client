export enum EVENT {
  LOGIN = 'login',
}

export enum CLIENT {
  LOGIN = 8003150,
}

export enum SERVER {
  LOGIN = 8003050,
  INFO = 8003095,
  LOBBY = 8003001,
  UPDATE_LOBBY = 8003002,
}

export type Frame = {
  cmd: number;
  data: any;
};
