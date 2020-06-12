import Service from './service';
import joinRoom from './join_room';

const service = new Service('wss://blackjack-stg.ulgplay.com:8881/ws');

function init(token: any) {
  return service.connect(token);
}

function join(roomID: number) {
  return joinRoom(service, roomID);
}

export default { init, join };