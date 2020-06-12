import { Action } from '../types';

export enum ROOM {
  ADD = 'ADD_ROOM',
  EDIT = 'EDIT_ROOM',
}

export interface Room {
  id: number;
  history: string[];
  maxBet: number;
  minBet: number;
}

export interface AddRoomAction extends Action<Room[]> {
  type: typeof ROOM.ADD;
  payload: Room[];
}

export interface EditRoomAction extends Action<Room> {
  type: typeof ROOM.EDIT;
  payload: Room;
}

export type RoomAction = AddRoomAction | EditRoomAction;

export interface Props {
  id: number;
  max_bet: number;
  min_bet: number;
  history: (number | string)[];
}
