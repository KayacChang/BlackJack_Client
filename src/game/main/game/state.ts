import { createMachine, interpret, assign, Interpreter, State } from 'xstate';
import store, { observe } from '../../../store';
import { Hand, SEAT, GAME_STATE } from '../../../models';

interface Context {
  hands: Hand[];
}

type Event = { type: 'START' } | { type: 'DEAL'; hand: Hand } | { type: 'SPLIT' } | { type: 'CLEAR' };

type Schema<T> = { value: 'idle'; context: T } | { value: 'normal'; context: T } | { value: 'split'; context: T };

export type HandsService = Interpreter<Context, any, Event, Schema<Context>>;
export type HandsState = State<Context, Event, any, Schema<Context>>;

function deal({ hands }: Context, event: Event) {
  //
  if (event.type === 'DEAL') {
    return [...hands, event.hand];
  }

  return hands;
}

function clear({ hands }: Context, event: Event) {
  //
  if (event.type === 'CLEAR') {
    return [];
  }

  return hands;
}

const machine = createMachine<Context, Event, Schema<Context>>(
  {
    initial: 'idle',

    context: {
      hands: [],
    },

    states: {
      //
      idle: {
        on: {
          START: { target: 'normal' },
        },
      },

      normal: {
        on: {
          DEAL: { target: 'normal', actions: 'deal' },
          SPLIT: { target: 'split', actions: 'split' },
          CLEAR: { target: 'idle', actions: 'clear' },
        },
      },

      split: {
        on: {
          DEAL: { target: 'split', actions: 'deal' },
          CLEAR: { target: 'idle', actions: 'clear' },
        },
      },
    },
  },
  {
    actions: {
      deal: assign({ hands: deal }),
      split: (context, event) => {},
      clear: assign({ hands: clear }),
    },
  }
);

function hasJoin(id: SEAT) {
  const { seat } = store.getState();

  const target = seat[id];

  return target.player && target.bet;
}

function onGameStateChange(service: HandsService, id: SEAT) {
  //
  function send(state: GAME_STATE) {
    if (state === GAME_STATE.DEALING) {
      service.send({ type: 'START' });
    }

    if (state === GAME_STATE.BETTING) {
      service.send({ type: 'CLEAR' });
    }
  }

  if (id === SEAT.DEALER) {
    return send;
  }

  return function onChange(state: GAME_STATE) {
    return hasJoin(id) && send(state);
  };
}

function onHandsChange(service: HandsService) {
  //
  return function (hands: Hand[][]) {
    //
    const latest = hands[hands.length - 1];
    if (!latest) {
      return;
    }

    for (const hand of latest) {
      service.send({ type: 'DEAL', hand });
    }
  };
}

export function createHandService(id: SEAT): HandsService {
  const service = interpret(machine);

  observe((state) => state.game.state, onGameStateChange(service, id));

  observe((state) => state.hand[id], onHandsChange(service));

  return service;
}
