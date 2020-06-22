import Service from '../service';
import { CLIENT } from '../../models';
import store from '../../store';

export default async function (service: Service) {
  const { game, user, seat } = store.getState();

  const bets = seat
    //
    .filter(({ player }) => player === user.name)
    .map(({ id, totalBet }) => ({ no: id, bet: totalBet }));

  console.log(bets);

  service.send({
    cmd: CLIENT.BET,
    data: {
      id: game.room,
      bets,
    },
  });
}
