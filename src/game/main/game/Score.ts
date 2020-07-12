import { Container } from 'pixi.js';
import { SEAT, PAIR, Hand, RESULT } from '../../../models';
import { HandsState, HandsService } from './state';
import Score from './Field';
import { config } from './static';
import { propEq } from 'ramda';
import { Bust, Win, Lose } from './icon';
import { tween } from './anim';

export default function updateScore(id: SEAT, layer: Container, service: HandsService) {
  //
  const scores = new Container();
  layer.addChild(scores);

  const results = new Container();
  layer.addChild(results);

  function addScore(pos: { x: number; y: number }, hands: Hand[]) {
    const score = Math.max(...hands.map(({ points }) => points));

    const field = new Score();

    const offsetY = 70;
    field.position.set(pos.x, pos.y + offsetY);

    field.text = String(score);

    scores.addChild(field);

    return score;
  }

  function setScore(state: HandsState, hands: Hand[]) {
    if (state.matches({ split: 'result' }) || state.matches({ split: 'deal' })) {
      //
      [PAIR.L, PAIR.R].forEach((pair) => {
        const score = addScore(config['split'][id][pair], hands.filter(propEq('pair', pair)));

        checkBust(pair, score, config['split'][id][pair]);
      });

      return;
    }

    if (
      state.matches({ normal: 'result' }) ||
      (state.matches({ normal: 'deal' }) && state.matches({ split: 'idle' }))
    ) {
      const score = addScore(config['normal'][id], hands);

      checkBust(PAIR.L, score, config['normal'][id]);

      return;
    }
  }

  function checkBust(pair: PAIR, score: number, pos: { x: number; y: number }) {
    if (pair === PAIR.L && score > 21) {
      service.send({ type: 'RESULT_NORMAL', results: { [PAIR.L]: RESULT.BUST } });
      showResult(RESULT.BUST, pos);

      return;
    }

    if (pair === PAIR.R && score > 21) {
      service.send({ type: 'RESULT_SPLIT', results: { [PAIR.R]: RESULT.BUST } });
      showResult(RESULT.BUST, pos);

      return;
    }
  }

  function toIcon(result: RESULT) {
    return {
      [RESULT.BUST]: Bust(),
      [RESULT.LOSE]: Lose(),
      [RESULT.WIN]: Win(),
    }[result];
  }

  function showResult(result: RESULT, pos: { x: number; y: number }) {
    const icon = toIcon(result);

    icon.position.set(pos.x, pos.y);
    tween(icon, { y: pos.y - 200 });

    results.addChild(icon);
  }

  return function update(state: HandsState) {
    if (!state.changed) {
      return state;
    }

    if (state.matches({ normal: 'idle' }) && state.matches({ split: 'idle' })) {
      scores.removeChildren();
      results.removeChildren();

      return state;
    }

    if (state.context.history.length <= 0) {
      return state;
    }

    scores.removeChildren();
    setScore(state, state.context.history);

    if (id === SEAT.DEALER) {
      return state;
    }

    if (state.matches({ normal: 'result' }) && state.matches({ split: 'idle' })) {
      showResult(state.context.results[PAIR.L], config['normal'][id]);

      return state;
    }

    if (state.matches({ split: 'result' }) && state.matches({ normal: 'result' })) {
      showResult(state.context.results[PAIR.L], config['split'][id][PAIR.L]);
      showResult(state.context.results[PAIR.R], config['split'][id][PAIR.R]);

      return state;
    }

    return state;
  };
}
