import { SERVER } from '../constants';
import Service from './service';
import { EVENT } from './type';

import store from '../store';
import { addRoom, editRoom } from '../store/room';
import { login } from '../store/user';

function onLogin(service: Service, data: any) {
  store.dispatch(login(data));

  return service.emit(EVENT.LOGIN, data);
}

function joinRoom(service: Service, data: any) {
  // const round = Room.join(data);
  // service.emit(EVENT.JOIN_ROOM, round);
}

export const LobbyMUX = {
  [SERVER.LOGIN]: onLogin,
  [SERVER.LOBBY]: (service: Service, data: any) => store.dispatch(addRoom(...data)),
  [SERVER.UPDATE_LOBBY]: (service: Service, data: any) => store.dispatch(editRoom(data)),
  [SERVER.JOIN_ROOM]: joinRoom,
};

export const RoomMUX = {
  // [GAME.BETTING]: (service: Service, data: any) => Room.betting(data),
  // [GAME.BET_END]: (service: Service, data: any) => Room.setState(data.state[0]),
  // [GAME.BEGIN]: (service: Service, data: any) => Room.deal(...data),
  // [GAME.DEAL]: (service: Service, data: any) => Room.deal(data),
  // [GAME.TURN]: (service: Service, data: any) => console.log(data),
  // [GAME.SETTLE]: (service: Service, data: any) => Room.settle(data),
};
