import { createMachine, interpret, assign, Interpreter, State } from 'xstate';
import store, { observe } from '../../../store';
import { Hand, SEAT, GAME_STATE, PAIR, RESULT } from '../../../models';

interface Context {
  latest: Hand[];
  history: Hand[];
  results: Record<PAIR, RESULT>;
}

type Event =
  | { type: 'INIT_NORMAL' }
  | { type: 'INIT_SPLIT'; hands: Hand[] }
  | { type: 'DEAL'; hands: Hand[] }
  | { type: 'CLEAR' }
  | { type: 'RESULT'; results: Record<PAIR, RESULT> }
  | { type: 'RESULT_NORMAL'; results: { [PAIR.L]: RESULT } }
  | { type: 'RESULT_SPLIT'; results: { [PAIR.R]: RESULT } };

type Schema<T> =
  | { value: { normal: 'idle' }; context: T }
  | { value: { normal: 'deal' }; context: T }
  | { value: { normal: 'result' }; context: T }
  | { value: { split: 'idle' }; context: T }
  | { value: { split: 'deal' }; context: T }
  | { value: { split: 'result' }; context: T };

export type HandsService = Interpreter<Context, any, Event, Schema<Context>>;
export type HandsState = State<Context, Event, any, Schema<Context>>;

const machine = createMachine<Context, Event, Schema<Context>>(
  {
    type: 'parallel',

    context: {
      latest: [],
      history: [],
      results: {
        [PAIR.L]: RESULT.LOSE,
        [PAIR.R]: RESULT.LOSE,
      },
    },

    states: {
      //
      normal: {
        initial: 'idle',

        states: {
          idle: {
            on: {
              INIT_NORMAL: { target: 'deal' },
            },
          },

          deal: {
            on: {
              DEAL: { target: 'deal', actions: 'deal' },
              RESULT_NORMAL: { target: 'result', actions: 'result' },
              RESULT: { target: 'result', actions: 'result' },
            },
          },

          result: {
            on: {
              CLEAR: { target: 'idle', actions: 'clear' },
            },
          },
        },
      },

      split: {
        initial: 'idle',

        states: {
          idle: {
            on: {
              INIT_SPLIT: { target: 'deal', actions: 'split' },
            },
          },

          deal: {
            on: {
              DEAL: { target: 'deal', actions: 'deal' },
              RESULT_SPLIT: { target: 'result', actions: 'result' },
              RESULT: { target: 'result', actions: 'result' },
            },
          },

          result: {
            on: {
              CLEAR: { target: 'idle', actions: 'clear' },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      result: assign({
        results: (context, event) => {
          if (event.type === 'RESULT_NORMAL' || event.type === 'RESULT_SPLIT') {
            return { ...context.results, ...event.results };
          }

          if (event.type === 'RESULT') {
            return { ...event.results, ...context.results };
          }

          return context.results;
        },
      }),

      deal: assign({
        latest: (context, event) => {
          if (event.type === 'DEAL') {
            return event.hands;
          }

          return context.latest;
        },

        history: (context, event) => {
          if (event.type === 'DEAL') {
            return [...context.history, ...event.hands];
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

        results: (context, event) => {
          if (event.type === 'CLEAR') {
            return {
              [PAIR.L]: RESULT.LOSE,
              [PAIR.R]: RESULT.LOSE,
            };
          }

          return context.results;
        },
      }),

      split: assign({
        latest: (context, event) => {
          if (event.type === 'INIT_SPLIT') {
            return [];
          }
          return context.latest;
        },

        history: (context, event) => {
          if (event.type === 'INIT_SPLIT') {
            return event.hands;
          }

          return context.history;
        },
      }),
    },
  }
);

function onGameStateChange(service: HandsService, id: SEAT) {
  let hasJoin = false;

  return function (state: GAME_STATE) {
    const { seat } = store.getState();

    const canJoin = id === SEAT.DEALER || (seat[id].player && seat[id].bet);

    if (state === GAME_STATE.BETTING && hasJoin) {
      hasJoin = false;

      return service.send({ type: 'CLEAR' });
    }

    if (state === GAME_STATE.DEALING && canJoin) {
      hasJoin = true;

      return service.send({ type: 'INIT_NORMAL' });
    }

    if (state === GAME_STATE.SETTLE) {
      return service.send({
        type: 'RESULT',
        results: {
          [PAIR.L]: seat[id].pays.L > 0 ? RESULT.WIN : RESULT.LOSE,
          [PAIR.R]: seat[id].pays.R > 0 ? RESULT.WIN : RESULT.LOSE,
        },
      });
    }
  };
}

function onHandsChange(service: HandsService) {
  let last: Hand[] = [];

  return function (hands: Hand[]) {
    const latest = hands.slice(last.length);
    last = hands;

    if (latest.length <= 0) {
      return;
    }

    service.send({ type: 'DEAL', hands: latest });
  };
}

function onSplit(service: HandsService, id: SEAT) {
  return function (split: boolean) {
    if (!split) {
      return;
    }

    const { hand } = store.getState();
    service.send({ type: 'INIT_SPLIT', hands: hand[id] });
  };
}

export function createHandService(id: SEAT): HandsService {
  const service = interpret(machine);

  observe((state) => state.game.state, onGameStateChange(service, id));
  observe((state) => state.hand[id], onHandsChange(service));
  observe((state) => state.seat[id].split, onSplit(service, id));

  return service;
}
