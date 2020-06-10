import socket from './network';
import RoomService from './rooms';

function init() {
  socket.connect();
}

export default { init, RoomService };
