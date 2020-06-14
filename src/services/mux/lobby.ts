import { SERVER, Room } from '../../models';
import Service from '../service';

import store from '../../store';
import { addRoom, editRoom } from '../../store/actions';

interface Prop {
  id: number;
  max_bet: number;
  min_bet: number;
  history: (number | string)[];
}

function toRoom({ id, max_bet, min_bet, history }: Prop): Room {
  return {
    id: Number(id),
    maxBet: Number(max_bet),
    minBet: Number(min_bet),
    history: history.map(String),
  };
}

function onLobby(service: Service, data: Prop[]) {
  const rooms = data.map(toRoom);

  return store.dispatch(addRoom(...rooms));
}

function onUpdate(service: Service, data: Prop) {
  const room = toRoom(data);

  return store.dispatch(editRoom(room));
}

export default {
  [SERVER.LOBBY]: onLobby,
  [SERVER.UPDATE_LOBBY]: onUpdate,
};
