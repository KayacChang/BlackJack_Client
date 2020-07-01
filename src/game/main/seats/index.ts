import { Container, Sprite } from 'pixi.js';
import { SEAT, Seats, Turn, GAME_STATE } from '../../../models';
import Seat, { SeatState } from './seat';
import store, { observe } from '../../../store';
import RES from '../../assets';
import gsap from 'gsap';

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

function Result(pay: number) {
  const result = new Sprite(RES.get('ICON_WIN').texture);

  result.anchor.set(0.5);
  result.position.set(0, -530);

  return result;
}

function updateState(seats: Container[]) {
  let previous: Sprite[] = [];

  return function (state: GAME_STATE) {
    const { seat } = store.getState();

    if (state === GAME_STATE.BETTING) {
      previous.forEach((el) => el.parent.removeChild(el));

      previous = [];
    }

    if (state === GAME_STATE.SETTLE) {
      Object.entries(seat)
        .filter(([, { player }]) => player)
        .forEach(([key, seat]) => {
          const found = seats.find(({ name }) => name === SEAT[Number(key)]);

          if (!found) {
            return;
          }

          const result = Result(seat.pay || 0);

          previous = [...previous, result];

          found.addChild(result);
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
    observe((state) => state.game.state, updateState(seats));
  };
}

export default function (meta: Props[]) {
  const seats = new Container();
  seats.name = 'seats';
  seats.once('added', init(seats, meta));

  return seats;
}
