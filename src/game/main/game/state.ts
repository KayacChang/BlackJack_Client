import { createMachine, interpret } from 'xstate';
import { Hand } from '../../../models';

interface Context {
  hands: Hand[];
}

type Event = { type: 'START' } | { type: 'DEAL'; hand: Hand } | { type: 'SPLIT' } | { type: 'CLEAR' };

type Schema<T> = { value: 'idle'; context: T } | { value: 'normal'; context: T } | { value: 'split'; context: T };

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
          START: 'normal',
        },
      },

      normal: {
        on: {
          DEAL: { target: '.', actions: 'deal' },
          SPLIT: { target: 'split', actions: 'split' },
          CLEAR: { target: 'idle', actions: 'clear' },
        },
      },

      split: {
        on: {
          DEAL: { target: '.', actions: 'deal' },
          CLEAR: { target: 'idle', actions: 'clear' },
        },
      },
    },
  },
  {
    actions: {
      deal: (context, event) => {},
      split: (context, event) => {},
      clear: (context, event) => {},
    },
  }
);

export function createHandService () {
  return interpret(machine);
}
