import { createMachine, interpret, assign, Interpreter, State } from 'xstate';
import { observe } from '../../../store';
import { Hand, SEAT, GAME_STATE } from '../../../models';

interface Context {
  latest: Hand[];
  history: Hand[];
}
type Event = { type: 'START' } | { type: 'DEAL'; hand: Hand[] } | { type: 'SPLIT' } | { type: 'CLEAR' };
type Schema<T> = { value: 'idle'; context: T } | { value: 'normal'; context: T } | { value: 'split'; context: T };
export type HandsService = Interpreter<Context, any, Event, Schema<Context>>;
export type HandsState = State<Context, Event, any, Schema<Context>>;

const machine = createMachine<Context, Event, Schema<Context>>(
  {
    initial: 'idle',

    context: {
      latest: [],
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
            return [...context.history, ...event.hand];
          }

          return context.history;
        },
      }),

      clear: assign({
        latest: (context, event) => {
          if (event.type === 'CLEAR') {
            return [];
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

function onGameStateChange(service: HandsService) {
  //
  return function (state: GAME_STATE) {
    if (state === GAME_STATE.DEALING) {
      service.send({ type: 'START' });
    }

    if (state === GAME_STATE.BETTING) {
      service.send({ type: 'CLEAR' });
    }
  };
}

function onHandsChange(service: HandsService) {
  //
  let last: Hand[] = [];

  return function (hands: Hand[]) {
    //
    const latest = hands.slice(last.length);
    last = hands;

    if (latest.length <= 0) {
      return;
    }

    service.send({ type: 'DEAL', hand: latest });
  };
}

function onSplit(service: HandsService) {
  //
  return function (split: boolean) {
    if (!split) {
      return;
    }

    service.send({ type: 'SPLIT' });
  };
}

export function createHandService(id: SEAT): HandsService {
  const service = interpret(machine);

  observe((state) => state.game.state, onGameStateChange(service));

  observe((state) => state.hand[id], onHandsChange(service));

  observe((state) => state.seat[id].split, onSplit(service));

  return service;
}
