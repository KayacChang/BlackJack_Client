import { Room } from '../../models';
import { RoomAction, ROOM } from '../types';

export function addRoom(...rooms: Room[]): RoomAction {
  return {
    type: ROOM.ADD,
    payload: rooms,
  };
}

export function editRoom(room: Room): RoomAction {
  return {
    type: ROOM.EDIT,
    payload: room,
  };
}
