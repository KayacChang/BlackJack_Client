import { S2C } from '../../models';
import Service from '../service';

import store from '../../store';
import { betStart, betEnd, settle, countdown, clearBet, dealCard, turn } from '../../store/actions';

import { GameProp, toGame, toGameState, CountDownProp, DealProp, toHand, TurnProp, toSeatNum, toPair } from '../types';
import { pipe } from 'ramda';
import { wait } from '../../utils';

function onBetStart(service: Service, data: GameProp) {
  store.dispatch(
    betStart(
      toGame({
        ...data,
        state: [S2C.ROUND.BET_START],
      })
    )
  );

  store.dispatch(countdown(20));
}

function onCountDown(service: Service, { expire }: CountDownProp) {
  //
  store.dispatch(countdown(expire));
}

function onBetEnd(service: Service, { state }: GameProp) {
  const { game } = store.getState();

  store.dispatch(
    betEnd({
      ...game,
      state: toGameState(state),
    })
  );
}

function onSettle(service: Service, prop: GameProp) {
  const { game, user } = store.getState();

  store.dispatch(
    settle({
      ...game,
      state: toGameState([S2C.ROUND.SETTLE]),
    })
  );

  store.dispatch(clearBet(user));
}

function prefix(prop: DealProp) {
  const cards = [...(prop.cards || []), prop.card];

  return { ...prop, cards };
}

function onBegin(service: Service, prop: DealProp[]) {
  const hands = prop.map(pipe(prefix, toHand));
  store.dispatch(dealCard(...hands));
}

function onDeal(service: Service, prop: DealProp) {
  store.dispatch(dealCard(toHand(prop)));
}

function onTurn(service: Service, { no, pile }: TurnProp) {
  const { game } = store.getState();

  store.dispatch(
    turn({
      ...game,
      turn: {
        seat: toSeatNum(no),
        pair: toPair(pile),
      },
    })
  );
}

async function onAction(service: Service, { expire }: TurnProp) {
  while (expire > 0) {
    expire -= 1;

    onCountDown(service, { expire });

    await wait(1000);
  }
}

export default {
  [S2C.ROUND.BET_START]: onBetStart,
  [S2C.ROUND.COUNT_DOWN]: onCountDown,
  [S2C.ROUND.BET_END]: onBetEnd,
  [S2C.ROUND.SETTLE]: onSettle,

  [S2C.ROUND.BEGIN]: onBegin,
  [S2C.ROUND.DEAL]: onDeal,

  [S2C.ROUND.TURN]: onTurn,
  [S2C.ROUND.ACTION]: onAction,
};
