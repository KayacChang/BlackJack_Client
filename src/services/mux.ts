import { SERVER, GAME } from '../constants';
import Service from './service';
import { User } from '../models';
import { EVENT } from './type';
import { Lobby, Room } from '../states';

function onLogin(service: Service, data: any) {
  const user = new User({
    id: data.user_id,
    name: data.user_name,
  });

  console.log(user);

  return service.emit(EVENT.LOGIN, user);
}

function joinRoom(service: Service, data: any) {
  const round = Room.join(data);

  service.emit(EVENT.JOIN_ROOM, round);
}

export const LobbyMUX = {
  [SERVER.LOGIN]: onLogin,
  [SERVER.LOBBY]: (service: Service, data: any) => Lobby.replace(...data),
  [SERVER.UPDATE_LOBBY]: (service: Service, data: any) => Lobby.update(data),
  [SERVER.JOIN_ROOM]: joinRoom,
};

export const RoomMUX = {
  [GAME.BETTING]: (service: Service, data: any) => Room.betting(data),
  [GAME.BET_END]: (service: Service, data: any) => Room.setState(data.state[0]),
  [GAME.BEGIN]: (service: Service, data: any) => Room.deal(...data),
  [GAME.DEAL]: (service: Service, data: any) => Room.deal(data),
  [GAME.TURN]: (service: Service, data: any) => console.log(data),
  [GAME.SETTLE]: (service: Service, data: any) => Room.settle(data),
};
