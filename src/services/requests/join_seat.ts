import Service from '../service';
import { CLIENT, SEAT, Seat } from '../../models';
import store from '../../store';
import { EVENT } from '../types';

export default async function (service: Service, seat: SEAT) {
  const { game } = store.getState();

  service.send({
    cmd: CLIENT.JOIN_SEAT,
    data: {
      id: game.room,
      no: seat,
    },
  });

  return await new Promise<Seat[]>((resolve) => service.once(EVENT.JOIN_SEAT, resolve));
}
