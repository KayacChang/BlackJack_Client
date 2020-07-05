import { Container } from 'pixi.js';
import { SEAT, GAME_STATE, Game, Turn } from '../../../models';
import { createSeat, Seat } from './seat';
import store, { observe } from '../../../store';
import gsap from 'gsap';
import { Bust, Win, Lose } from './icon';
import { Effect } from './effect';

type Props = {
  id: SEAT;
  x: number;
  y: number;
};

function updateResult(seats: Seat[]) {
  let previous: Container[] = [];

  function addResult(id: SEAT, result: Container) {
    const exist = previous.some(({ name }) => name === SEAT[id]);
    const found = seats.find(({ name }) => name === SEAT[id]);

    if (!found || exist) {
      return;
    }

    result.name = SEAT[id];

    gsap.fromTo(result, { y: -230, alpha: 0 }, { y: -430, alpha: 1 });

    previous = [...previous, result];
    found.addChild(result);
  }

  return function (game: Game) {
    const { seat, hand } = store.getState();

    if (game.state === GAME_STATE.BETTING) {
      previous.forEach((el) => el.parent.removeChild(el));

      previous = [];
    }

    if (game.state === GAME_STATE.DEALING) {
      for (const { id, points } of hand) {
        if (points > 21) {
          addResult(id, Bust());
        }
      }
    }

    if (game.state === GAME_STATE.SETTLE) {
      Object.entries(seat)
        .filter(([, { player, bet }]) => player && bet)
        .forEach(([key, seat]) => {
          addResult(Number(key), seat.pay && seat.pay > 0 ? Win() : Lose());
        });
    }
  };
}

function updateEffect(seats: Seat[]) {
  const effect = Effect();
  effect.visible = false;
  effect.scale.set(0.75);

  return function (turn?: Turn) {
    if (!turn) {
      effect.visible = false;
      return;
    }

    const found = seats.find(({ name }) => name === SEAT[turn.seat]);
    if (!found) {
      effect.visible = false;
      return;
    }

    effect.visible = true;
    found.addChild(effect);
  };
}

export default function Seats(meta: Props[]) {
  const it = new Container();
  it.name = 'seats';

  it.once('added', function onInit({ width, height }: Container) {
    //

    const seats = meta.map(({ id, x, y }) =>
      createSeat({
        id,
        x: width * x,
        y: height * y,
      })
    );

    it.addChild(...seats);

    observe((state) => state.game.turn, updateEffect(seats));
    observe((state) => state.game, updateResult(seats));
  });

  return it;
}
