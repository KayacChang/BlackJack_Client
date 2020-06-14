import { pipe } from 'ramda';

import { GAME } from '../../models';
import Service from '../service';

import store from '../../store';
import { betting, joinGame, betend, settle, deal, turn } from '../../store/actions';

import { GameProp, toGame, toSeats, toGameState, DealProp, toHand, EVENT } from '../types';

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
  return store.dispatch(
    betting(
      toGame({
        ...data,
        state: [GAME.BETTING],
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
  const seats = toSeats(prop);

  return store.dispatch(settle({ game, seats }));
}

function prefix(prop: DealProp) {
  const cards = [...(prop.cards || []), prop.card];

  return { ...prop, cards };
}

function onBegin(service: Service, prop: DealProp[]) {
  const hands = prop.map(pipe(prefix, toHand));

  return store.dispatch(deal(...hands));
}

function onDeal(service: Service, prop: DealProp) {
  return store.dispatch(deal(toHand(prop)));
}

interface TurnProp {
  no: number;
  pile: number;
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

export default {
  [GAME.JOIN]: onJoinRoom,
  [GAME.BETTING]: onBetting,
  [GAME.BET_END]: onBetEnd,
  [GAME.BEGIN]: onBegin,
  [GAME.DEAL]: onDeal,
  [GAME.TURN]: onTurn,
  [GAME.SETTLE]: onSettle,
};
