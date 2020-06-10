import { EVENT } from './type';
import Service from './service';
import { CLIENT, toRound } from '../models';

export default async function (service: Service, id: number) {
  console.groupCollapsed('Join Room');

  const request = {
    cmd: CLIENT.JOIN_ROOM,
    data: { id },
  };

  console.log(request);
  service.send(request);

  const response = await new Promise((resolve) => {
    service.once(EVENT.JOIN_ROOM, resolve);
  });

  const round = toRound(response);
  console.log(round);
  console.groupEnd();

  return round;
}
