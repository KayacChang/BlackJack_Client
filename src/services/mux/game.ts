import { S2C } from '../../models';
import Service from '../service';

import store from '../../store';
import { betStart, betEnd, settle, countdown, clearBet } from '../../store/actions';

import { GameProp, toGame, toGameState, CountDownProp } from '../types';

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
  store.dispatch(countdown(expire - 1));
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

// function prefix(prop: DealProp) {
//   const cards = [...(prop.cards || []), prop.card];

//   return { ...prop, cards };
// }

// function onBegin(service: Service, prop: DealProp[]) {
//   const hands = prop.map(pipe(prefix, toHand));

//   return store.dispatch(dealCard(...hands));
// }

// function onDeal(service: Service, prop: DealProp) {
//   return store.dispatch(dealCard(toHand(prop)));
// }

// function onTurn(service: Service, { no, pile }: TurnProp) {
//   const { game } = store.getState();

//   return store.dispatch(
//     turn({
//       ...game,
//       state: toGameState([GAME.TURN, no, pile]),
//     })
//   );
// }

export default {
  [S2C.ROUND.BET_START]: onBetStart,
  [S2C.ROUND.COUNT_DOWN]: onCountDown,
  [S2C.ROUND.BET_END]: onBetEnd,
  [S2C.ROUND.SETTLE]: onSettle,

  // [GAME.BEGIN]: onBegin,
  // [GAME.DEAL]: onDeal,
  // [GAME.TURN]: onTurn,
};
