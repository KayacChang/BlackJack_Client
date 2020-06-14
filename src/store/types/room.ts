import { Action } from './base';
import { Room } from '../../models';

const PREFIX = '[ROOM]';

export const ROOM = Object.freeze({
  ADD: `${PREFIX} ADD`,
  EDIT: `${PREFIX} EDIT`,
});

export interface AddRoomAction extends Action<Room[]> {
  type: typeof ROOM.ADD;
  payload: Room[];
}

export interface EditRoomAction extends Action<Room> {
  type: typeof ROOM.EDIT;
  payload: Room;
}

export type RoomAction = AddRoomAction | EditRoomAction;
