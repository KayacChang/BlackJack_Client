import { Action } from './base';
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
