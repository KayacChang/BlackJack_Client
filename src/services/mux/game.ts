import { GAME, SEAT, PAIR, Game, Seat, GameState } from '../../models';
import Service from '../service';

import store from '../../store';
import { betting, joinGame, betend, settle } from '../../store/actions';
import { EVENT } from '../type';

interface SeatProp {
  no: number;
  player: string;
  total_bet: number;
}

type GameStateProp = [number, number?, number?];

interface GameProp {
  round: string;
  state: GameStateProp;
  seats: SeatProp[];
  shoe_num: number;
}

function toGameState([type, seat, pair]: GameStateProp): GameState {
  return {
    type: type as GAME,
    seat: seat as SEAT,
    pair: pair as PAIR,
  };
}

function toGame({ round, state }: GameProp): Game {
  return {
    round: String(round),
    state: toGameState(state),
  };
}

function toSeat({ no, player, total_bet }: SeatProp): Seat {
  return {
    id: Number(no),
    player: String(player),
    totalBet: Number(total_bet),
  };
}

function isPlayerExist({ player }: SeatProp) {
  return Boolean(player);
}

function toSeats({ seats }: GameProp) {
  return seats.filter(isPlayerExist).map(toSeat);
}

function onJoinRoom(service: Service, data: GameProp) {
  const action = store.dispatch(
    joinGame({
      game: toGame(data),
      seats: toSeats(data),
    })
  );

  return service.emit(EVENT.JOIN_ROOM, action.payload);
}

function onBetting(service: Service, data: GameProp) {
  const game = toGame({
    ...data,
    state: [GAME.BETTING],
  });

  return store.dispatch(betting(game));
}

function onBetEnd(service: Service, { state }: GameProp) {
  const { game } = store.getState();

  return store.dispatch(
    betend({
      ...game,
      state: toGameState(state),
    })
  );
}

function onSettle(service: Service, prop: GameProp) {
  const { game } = store.getState();
  const seats = toSeats(prop);

  return store.dispatch(settle({ game, seats }));
}

export default {
  [GAME.JOIN]: onJoinRoom,
  [GAME.BETTING]: onBetting,
  [GAME.BET_END]: onBetEnd,
  // [GAME.BEGIN]: (service: Service, data: any) => console.log(data),
  // [GAME.DEAL]: (service: Service, data: any) => console.log(data),
  // [GAME.TURN]: (service: Service, data: any) => console.log(data),
  [GAME.SETTLE]: onSettle,
};
