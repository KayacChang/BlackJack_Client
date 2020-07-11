import { createMachine, interpret, assign, Interpreter, State } from "xstate";
import store, { observe } from "../../../store";
import { Hand, SEAT, GAME_STATE } from "../../../models";

interface Context {
  latest: Hand[];
  history: Hand[];
}

type Event =
  | { type: "START" }
  | { type: "DEAL"; hands: Hand[] }
  | { type: "SPLIT"; hands: Hand[] }
  | { type: "CLEAR" }
  | { type: "RESULT" };

type Schema<T> =
  | { value: "idle"; context: T }
  | { value: "normal"; context: T }
  | { value: "split"; context: T }
  | { value: "result"; context: T }
  | { value: { result: "lose" }; context: T }
  | { value: { result: "win" }; context: T }
  | { value: { result: "bust" }; context: T };

export type HandsService = Interpreter<Context, any, Event, Schema<Context>>;
export type HandsState = State<Context, Event, any, Schema<Context>>;

const machine = createMachine<Context, Event, Schema<Context>>(
  {
    initial: "idle",

    context: {
      latest: [],
      history: [],
    },

    states: {
      //
      idle: {
        on: {
          START: { target: "normal" },
        },
      },

      normal: {
        always: [
          { target: "result.win", cond: "didPlayerWin" },
          { target: "result.lose", cond: "didPlayerLose" },
        ],

        on: {
          DEAL: { target: "normal", actions: "deal" },
          SPLIT: { target: "split", actions: "split" },
          RESULT: { target: "result" },
        },
      },

      split: {
        always: [
          { target: "result.win", cond: "didPlayerWin" },
          { target: "result.lose", cond: "didPlayerLose" },
        ],

        on: {
          DEAL: { target: "split", actions: "deal" },
          RESULT: { target: "result" },
        },
      },

      result: {
        initial: "lose",

        states: {
          lose: {},
          win: {},
          bust: {},
        },

        on: {
          CLEAR: { target: "idle", actions: "clear" },
        },
      },
    },
  },
  {
    guards: {},
    actions: {
      deal: assign({
        latest: (context, event) => {
          if (event.type === "DEAL") {
            return event.hands;
          }

          return context.latest;
        },

        history: (context, event) => {
          if (event.type === "DEAL") {
            return [...context.history, ...event.hands];
          }

          return context.history;
        },
      }),

      clear: assign({
        latest: (context, event) => {
          if (event.type === "CLEAR") {
            return [];
          }

          return context.latest;
        },

        history: (context, event) => {
          if (event.type === "CLEAR") {
            return [];
          }

          return context.history;
        },
      }),

      split: assign({
        latest: (context, event) => {
          if (event.type === "SPLIT") {
            return [];
          }
          return context.latest;
        },

        history: (context, event) => {
          if (event.type === "SPLIT") {
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

      return service.send({ type: "CLEAR" });
    }

    if (state === GAME_STATE.DEALING && canJoin) {
      hasJoin = true;

      return service.send({ type: "START" });
    }

    if (state === GAME_STATE.SETTLE) {
      return service.send({ type: "RESULT" });
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

    service.send({ type: "DEAL", hands: latest });
  };
}

function onSplit(service: HandsService, id: SEAT) {
  return function (split: boolean) {
    if (!split) {
      return;
    }

    const { hand } = store.getState();
    service.send({ type: "SPLIT", hands: hand[id] });
  };
}

export function createHandService(id: SEAT): HandsService {
  const service = interpret(machine);

  observe((state) => state.game.state, onGameStateChange(service, id));
  observe((state) => state.hand[id], onHandsChange(service));
  observe((state) => state.seat[id].split, onSplit(service, id));

  return service;
}
