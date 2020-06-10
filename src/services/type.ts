export enum EVENT {
  LOGIN = 'login',
  JOIN_ROOM = 'join_room',
}

export interface Frame {
  cmd: number;
  data: any;
}
