import Service from './service';
import RoomService from './rooms';
import joinRoom from './join_room';
import { Token } from '../models';

const service = new Service('wss://blackjack-stg.ulgplay.com:8881/ws');

function init(token: Token) {
  return service.connect(token);
}

function join(roomID: number) {
  return joinRoom(service, roomID);
}

export default { init, join, RoomService };
