import { createMachine, interpret, assign, Interpreter, State } from 'xstate';
import store, { observe } from '../../../store';
import { Hand, SEAT, GAME_STATE } from '../../../models';

interface Context {
  latest?: Hand;
  history: Hand[];
}

type Event = { type: 'START' } | { type: 'DEAL'; hand: Hand } | { type: 'SPLIT' } | { type: 'CLEAR' };

type Schema<T> = { value: 'idle'; context: T } | { value: 'normal'; context: T } | { value: 'split'; context: T };

export type HandsService = Interpreter<Context, any, Event, Schema<Context>>;
export type HandsState = State<Context, Event, any, Schema<Context>>;

const machine = createMachine<Context, Event, Schema<Context>>(
  {
    initial: 'idle',

    context: {
      latest: undefined,
      history: [],
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
      deal: assign({
        latest: (context, event) => {
          if (event.type === 'DEAL') {
            return event.hand;
          }

          return context.latest;
        },

        history: (context, event) => {
          if (event.type === 'DEAL') {
            return [...context.history, event.hand];
          }

          return context.history;
        },
      }),

      clear: assign({
        latest: (context, event) => {
          if (event.type === 'CLEAR') {
            return undefined;
          }

          return context.latest;
        },

        history: (context, event) => {
          if (event.type === 'CLEAR') {
            return [];
          }

          return context.history;
        },
      }),

      split: (context, event) => {},
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
  return function (hands: Hand[]) {
    //
    const latest = hands[hands.length - 1];
    if (!latest) {
      return;
    }

    service.send({ type: 'DEAL', hand: latest });
  };
}

export function createHandService(id: SEAT): HandsService {
  const service = interpret(machine);

  observe((state) => state.game.state, onGameStateChange(service, id));

  observe((state) => state.hand[id], onHandsChange(service));

  return service;
}
