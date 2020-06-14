import Service from './service';
import { joinRoom as _joinRoom, joinSeat as _joinSeat } from './requests';
import { Token, SEAT } from '../models';

const service = new Service('ws://35.184.168.53:8881/ws');

function init(token: Token) {
  return service.connect(token);
}

function joinRoom(roomID: number) {
  return _joinRoom(service, roomID);
}

function joinSeat(seat: SEAT) {
  return _joinSeat(service, seat);
}

export default { init, joinRoom, joinSeat };
