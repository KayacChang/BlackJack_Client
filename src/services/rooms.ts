import { observable, observe, IArraySplice, IArrayChange } from 'mobx';
import { Room } from '../models/room';

const rooms = observable([] as Room[], { deep: false });

observe(rooms, (change) => {
  //
  switch (change.type) {
    case 'splice':
      return onSplice(change);
    case 'update':
      return onUpdate(change);
  }
});

function onSplice({ added }: IArraySplice<Room>) {
  console.groupCollapsed('Room');
  console.log(added);
  console.groupEnd();
}

function onUpdate({ newValue, oldValue }: IArrayChange<Room>) {
  console.groupCollapsed(`Update Room: ${newValue.id}`);

  console.log('Old', oldValue);
  console.log('New', newValue);

  console.groupEnd();
}

function replace(...newRooms: Room[]) {
  newRooms = newRooms.sort((a, b) => a.id - b.id);

  rooms.replace(newRooms);
}

function update(newRoom: Room) {
  const finded = rooms.findIndex(({ id }) => id === newRoom.id);

  rooms[finded] = newRoom;
}

export default {
  replace,
  update,
};
