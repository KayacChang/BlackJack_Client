import { EVENT } from '../types';
import Service from '../service';
import { C2S, DECISION } from '../../models';
import store from '../../store';

export default async function (service: Service, decision: DECISION) {
  const { game, user, seat } = store.getState();

  if (!game.turn) {
    throw new Error(`No turn existed...`);
  }

  if (seat[game.turn.seat].player !== user.name) {
    throw new Error(`Not user's turn ...`);
  }

  service.send({
    cmd: C2S.CLIENT.DECISION,
    data: {
      id: game.room,
      action: decision,
      no: game.turn.seat,
      pile: game.turn.pair,
    },
  });

  return new Promise((resolve) => {
    service.once(EVENT.DECISION, resolve);
  });
}
