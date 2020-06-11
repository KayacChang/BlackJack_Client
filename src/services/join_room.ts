import { EVENT } from './type';
import Service from './service';
import { CLIENT } from '../constants';

export default async function (service: Service, id: number) {
  console.groupCollapsed('Join Room');

  service.send({
    cmd: CLIENT.JOIN_ROOM,
    data: { id },
  });

  console.groupEnd();

  return new Promise((resolve) => {
    service.once(EVENT.JOIN_ROOM, resolve);
  });
}
