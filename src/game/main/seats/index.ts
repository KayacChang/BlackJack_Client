import { Container, Sprite } from 'pixi.js';
import { SEAT, Seats, Turn, GAME_STATE, Game } from '../../../models';
import Seat, { SeatState } from './seat';
import store, { observe } from '../../../store';
import RES from '../../assets';
import gsap from 'gsap';
import GameText from '../text';

type Props = {
  id: SEAT;
  x: number;
  y: number;
};

function findSeat(seats: Container[], id: SEAT) {
  return seats.find(({ name }) => name === SEAT[id]);
}

function update(seats: Container[]) {
  //
  return function (state: Seats) {
    //
    for (const [id, seat] of Object.entries(state)) {
      //
      const found = findSeat(seats, Number(id) as SEAT);

      if (!seat.player) {
        found?.emit('statechange', SeatState.Empty);

        continue;
      }

      found?.emit('statechange', SeatState.OccupyByUser, seat.player);
    }
  };
}

function Effect() {
  const effect = new Sprite(RES.get('SEAT_NORMAL').texture);

  effect.tint = 0xf0aa0a;
  effect.anchor.set(0.5);

  gsap.fromTo(
    //
    effect,
    { pixi: { alpha: 1, scale: 1 } },
    { pixi: { alpha: 0, scale: 1.5 }, duration: 1, repeat: -1 }
  );

  return effect;
}

function updateTurn(seats: Container[]) {
  const effect = Effect();

  return function (turn?: Turn) {
    if (!turn) {
      effect.visible = false;
      return;
    }

    const { seat, pair } = turn;

    const found = findSeat(seats, seat);
    if (!found) {
      effect.visible = false;

      return;
    }

    effect.visible = true;

    found.addChild(effect);
  };
}

function Win() {
  const result = new Container();

  const icon = new Sprite(RES.get('ICON_WIN').texture);
  icon.anchor.set(0.5);
  result.addChild(icon);

  const text = GameText('WIN', { fill: 0x000000, fontSize: 36 });
  text.anchor.set(0.5);
  text.position.set(0, 76);
  result.addChild(text);

  return result;
}

function Lose() {
  const result = new Container();

  const icon = new Sprite(RES.get('ICON_LOSE').texture);
  icon.anchor.set(0.5);
  result.addChild(icon);

  const text = GameText('LOSE', { fontSize: 36 });
  text.anchor.set(0.5);
  text.position.set(0, 65);
  result.addChild(text);

  return result;
}

function Bust() {
  const result = new Container();

  const icon = new Sprite(RES.get('ICON_BUST').texture);
  icon.anchor.set(0.5);
  result.addChild(icon);

  const text = GameText('BUST', { fontSize: 36 });
  text.anchor.set(0.5);
  text.position.set(0, 65);
  result.addChild(text);

  return result;
}

function updateState(seats: Container[]) {
  let previous: Container[] = [];

  function addResult(id: SEAT, result: Container) {
    const exist = previous.some(({ name }) => name === SEAT[id]);
    const found = seats.find(({ name }) => name === SEAT[id]);

    if (!found || exist) {
      return;
    }

    result.name = SEAT[id];

    gsap.fromTo(result, { y: -330, alpha: 0 }, { y: -530, alpha: 1 });

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

function init(container: Container, meta: Props[]) {
  //
  return function onInit({ width, height }: Container) {
    //
    const seats = meta.map(({ id, x, y }) =>
      Seat({
        id: id,
        x: width * x,
        y: height * y,
      })
    );

    container.addChild(...seats);

    seats.forEach((seat) => seat.emit('statechange', SeatState.Empty));

    observe((state) => state.seat, update(seats));
    observe((state) => state.game.turn, updateTurn(seats));
    observe((state) => state.game, updateState(seats));
  };
}

export default function (meta: Props[]) {
  const seats = new Container();
  seats.name = 'seats';
  seats.once('added', init(seats, meta));

  return seats;
}
