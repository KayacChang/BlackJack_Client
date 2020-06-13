import { RoomAction, ROOM } from './types';
import { Room } from '../../models';
import { sort, ascend, prop } from 'ramda';

const initialState: Room[] = [];

export * from './types';
export * from './actions';

const sortRoomAscByID = sort<Room>(ascend(prop('id')));

export default function rooms(state = initialState, action: RoomAction): Room[] {
  const { type, payload } = action;

  if (type === ROOM.ADD) {
    const rooms = payload as Room[];

    return sortRoomAscByID([...state, ...rooms]);
  }

  if (type === ROOM.EDIT) {
    const newRoom = payload as Room;

    return state.map((room) => {
      return room.id === newRoom.id ? { ...room, ...newRoom } : room;
    });
  }

  return state;
}
