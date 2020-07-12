import { Container } from 'pixi.js';
import { SEAT, PAIR } from '../../../models';
import { HandsState } from './state';
import Poker from './Poker';
import { config, origin } from './static';
import { move } from './anim';

export default function updateHand(id: SEAT, layer: Container) {
  //
  const mapping = new Map<string, Poker>();

  let hands: Record<PAIR, Poker[]> = {
    [PAIR.L]: [],
    [PAIR.R]: [],
  };

  return function update(state: HandsState) {
    if (!state.changed) {
      return state;
    }

    if (state.matches({ normal: 'idle' }) && state.matches({ split: 'idle' })) {
      mapping.forEach((poker) => poker.parent.removeChild(poker));
      hands = {
        [PAIR.L]: [],
        [PAIR.R]: [],
      };
      mapping.clear();

      return state;
    }

    if (state.matches({ split: 'deal' }) && state.context.latest.length === 0) {
      //
      hands = {
        [PAIR.L]: [],
        [PAIR.R]: [],
      };

      for (const hand of state.context.history) {
        //
        const poker = mapping.get(hand.id);
        if (!poker) {
          continue;
        }

        hands[hand.pair] = [...hands[hand.pair], poker];
      }

      move(hands[PAIR.L], config['split'][id][PAIR.L]);
      move(hands[PAIR.R], config['split'][id][PAIR.R]);

      return state;
    }

    if (state.matches({ normal: 'deal' }) && state.matches({ split: 'deal' }) && state.context.latest.length > 0) {
      //
      for (const hand of state.context.latest) {
        const { suit, rank } = hand.card;

        const poker = new Poker(suit, rank);
        poker.alpha = 0;
        poker.position.set(origin.x, origin.y);
        layer.addChild(poker);

        mapping.set(hand.id, poker);
        hands[hand.pair] = [...hands[hand.pair], poker];
      }

      move(hands[PAIR.L], config['split'][id][PAIR.L]);
      move(hands[PAIR.R], config['split'][id][PAIR.R]);

      return state;
    }

    if (state.matches({ split: 'idle' }) && state.matches({ normal: 'deal' }) && state.context.latest.length > 0) {
      //
      for (const hand of state.context.latest) {
        const { suit, rank } = hand.card;

        const poker = new Poker(suit, rank);
        poker.alpha = 0;
        poker.position.set(origin.x, origin.y);
        layer.addChild(poker);

        mapping.set(hand.id, poker);
        hands[hand.pair] = [...hands[hand.pair], poker];
      }

      move(hands[PAIR.L], config['normal'][id]);

      return state;
    }

    return state;
  };
}
