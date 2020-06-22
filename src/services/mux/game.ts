import { pipe } from 'ramda';

import { GAME } from '../../models';
import Service from '../service';

import store from '../../store';
import { betting, join, betend, settle, dealCard, turn, updateSeats } from '../../store/actions';

import {
  GameProp,
  toGame,
  toSeats,
  toGameState,
  DealProp,
  toHand,
  EVENT,
  TurnProp,
  CountDownProp,
  toSeat,
  SeatProp,
} from '../types';

function onJoinRoom(service: Service, data: GameProp) {
  const action = store.dispatch(join(toGame(data)));

  store.dispatch(updateSeats(toSeats(data)));

  return service.emit(EVENT.JOIN_ROOM, action.payload);
}

function onBetStart(service: Service, data: GameProp) {
  return store.dispatch(
    betting(
      toGame({
        ...data,
        state: [GAME.BET_START],
      })
    )
  );
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

  return store.dispatch(
    settle({
      ...game,
      state: toGameState([GAME.SETTLE]),
    })
  );
}

function prefix(prop: DealProp) {
  const cards = [...(prop.cards || []), prop.card];

  return { ...prop, cards };
}

function onBegin(service: Service, prop: DealProp[]) {
  const hands = prop.map(pipe(prefix, toHand));

  return store.dispatch(dealCard(...hands));
}

function onDeal(service: Service, prop: DealProp) {
  return store.dispatch(dealCard(toHand(prop)));
}

function onTurn(service: Service, { no, pile }: TurnProp) {
  const { game } = store.getState();

  return store.dispatch(
    turn({
      ...game,
      state: toGameState([GAME.TURN, no, pile]),
    })
  );
}

function onUpdateSeat(service: Service, data: SeatProp[]) {
  const hasPlayer = ({ player }: SeatProp) => Boolean(player);
  const seats = data.filter(hasPlayer).map(toSeat);

  const action = store.dispatch(updateSeats(seats));

  return service.emit(EVENT.UPDATE_SEAT, action.payload);
}

export default {
  [GAME.JOIN]: onJoinRoom,
  [GAME.UPDATE_SEAT]: onUpdateSeat,

  [GAME.BETTING]: (service: Service, { expire }: CountDownProp) => console.log(expire),
  [GAME.BET_START]: onBetStart,
  [GAME.BET_END]: onBetEnd,
  [GAME.BEGIN]: onBegin,
  [GAME.DEAL]: onDeal,
  [GAME.TURN]: onTurn,
  [GAME.SETTLE]: onSettle,
};
