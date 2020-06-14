import Service from '../service';
import { CLIENT, SEAT } from '../../models';
import store from '../../store';

export default async function (service: Service, seat: SEAT) {
  const { game } = store.getState();

  service.send({
    cmd: CLIENT.JOIN_SEAT,
    data: {
      id: game.room,
      no: seat,
    },
  });
}
