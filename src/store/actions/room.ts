import { Room } from '../../models';
import { RoomAction, ROOM } from '../types';

interface Props {
  id: number;
  max_bet: number;
  min_bet: number;
  history: (number | string)[];
}

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
