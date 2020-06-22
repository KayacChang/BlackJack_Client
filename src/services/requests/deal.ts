import { EVENT } from '../types';
import Service from '../service';
import { CLIENT } from '../../models';
import store from '../../store';

export default async function (service: Service) {
  const { game, user, seat } = store.getState();

  const bets = seat
    //
    // .filter(({ player }) => player === user.name)
    .map(({ id, totalBet }) => ({ no: id, bet: totalBet }));

  service.send({
    cmd: CLIENT.BET,
    data: {
      id: game.room,
      bets,
    },
  });

  return new Promise((resolve) => {
    service.once(EVENT.BET, resolve);
  });
}
