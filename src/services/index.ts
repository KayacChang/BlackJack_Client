import Service from './service';
import { joinRoom as _joinRoom, joinSeat as _joinSeat } from './requests';
import { Token, SEAT } from '../models';

const service = new Service(process.env.REACT_APP_BACKEND || '');

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
