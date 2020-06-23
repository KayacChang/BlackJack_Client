import Service from '../service';
import { C2S, SEAT } from '../../models';
import store from '../../store';

export default async function (service: Service, seat: SEAT) {
  const { game } = store.getState();

  service.send({
    cmd: C2S.CLIENT.JOIN_SEAT,
    data: {
      id: game.room,
      no: seat,
    },
  });
}
