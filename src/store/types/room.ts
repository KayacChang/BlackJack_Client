import { Room } from '../../models';
import { Action } from 'redux';
import { Payload } from './base';

const PREFIX = '[ROOM]';

export const ROOM = Object.freeze({
  ADD: `${PREFIX} ADD`,
  EDIT: `${PREFIX} EDIT`,
});

export type AddRoomAction = Action<typeof ROOM.ADD> & Payload<Room[]>;
export type EditRoomAction = Action<typeof ROOM.EDIT> & Payload<Room>;

export type RoomAction = AddRoomAction | EditRoomAction;
