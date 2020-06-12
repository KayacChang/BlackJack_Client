import { Action } from '../types';
import { Room } from '../../models';

export enum ROOM {
  ADD = 'ADD_ROOM',
  EDIT = 'EDIT_ROOM',
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
