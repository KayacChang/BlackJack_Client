import { Props, RoomAction, ROOM } from './types';
import { Room } from '../../models';

function toRoom({ id, max_bet, min_bet, history }: Props): Room {
  return {
    id: Number(id),
    maxBet: Number(max_bet),
    minBet: Number(min_bet),
    history: history.map(String),
  };
}

export function addRoom(...rooms: Props[]): RoomAction {
  return {
    type: ROOM.ADD,
    payload: rooms.map(toRoom),
  };
}

export function editRoom(room: Props): RoomAction {
  return {
    type: ROOM.EDIT,
    payload: toRoom(room),
  };
}
