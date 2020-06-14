import { Room } from '../../models';
import { sort, ascend, prop } from 'ramda';
import { RoomAction, ROOM } from '../types';

const sortRoomAscByID = sort<Room>(ascend(prop('id')));

function update(newRoom: Room, rooms: Room[]) {
  return rooms.map((room) => {
    if (room.id === newRoom.id) {
      return {
        ...room,
        ...newRoom,
        history: newRoom.history,
      };
    }

    return room;
  });
}

const initialState: Room[] = [];

export default function roomReducer(state = initialState, action: RoomAction): Room[] {
  const { type, payload } = action;

  if (type === ROOM.ADD) {
    const rooms = payload as Room[];

    return sortRoomAscByID([...state, ...rooms]);
  }

  if (type === ROOM.EDIT) {
    const newRoom = payload as Room;

    return update(newRoom, state);
  }

  return state;
}
