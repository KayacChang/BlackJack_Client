import { SERVER, GAME } from '../constants';
import Service from './service';
import { User } from '../models';
import { EVENT } from './type';
import { Rounds, Rooms } from '../states';

function onLogin(service: Service, data: any) {
  const user = new User({
    id: data.user_id,
    name: data.user_name,
  });

  console.log(user);

  return service.emit(EVENT.LOGIN, user);
}

function joinRoom(service: Service, data: any) {
  const round = Rounds.start(data);

  service.emit(EVENT.JOIN_ROOM, round);
}

export const LobbyMUX = {
  [SERVER.LOGIN]: onLogin,
  [SERVER.LOBBY]: (service: Service, data: any) => Rooms.replace(...data),
  [SERVER.UPDATE_LOBBY]: (service: Service, data: any) => Rooms.update(data),
  [SERVER.JOIN_ROOM]: joinRoom,
};

export const RoomMUX = {
  [GAME.BETTING]: (service: Service, data: any) => Rounds.start({ ...data, state: [GAME.BETTING] }),
  [GAME.BET_END]: (service: Service, data: any) => console.log(data),
  [GAME.BEGIN]: (service: Service, data: any) => console.log(data),
  [GAME.DEAL]: (service: Service, data: any) => console.log(data),
  [GAME.TURN]: (service: Service, data: any) => console.log(data),
  [GAME.SETTLE]: (service: Service, data: any) => console.log(data),
};
