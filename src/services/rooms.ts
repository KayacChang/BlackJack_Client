import { observable, observe, IArraySplice, IArrayChange } from 'mobx';
import { toRoom, Room } from '../models';

const rooms = observable([] as Room[], { deep: false });

observe(rooms, (change) => {
  switch (change.type) {
    case 'splice':
      return onSplice(change);
    case 'update':
      return onUpdate(change);
  }
});

function onSplice({ added }: IArraySplice<Room>) {
  console.groupCollapsed('Room Init');
  console.log(added);
  console.groupEnd();
}

function onUpdate({ newValue, oldValue }: IArrayChange<Room>) {
  // console.groupCollapsed(`Room Update: ${newValue.id}`);
  // console.log('Old', oldValue);
  // console.log('New', newValue);
  // console.groupEnd();
}

function replace(...data: any[]) {
  const newRooms = data.map(toRoom).sort((a, b) => a.id - b.id);

  rooms.replace(newRooms);
}

function update(data: any) {
  const newRoom = toRoom(data);

  const finded = rooms.findIndex(({ id }) => id === newRoom.id);

  rooms[finded] = newRoom;
}

export default {
  replace,
  update,
};
