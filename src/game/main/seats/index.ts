import { Container, Sprite } from 'pixi.js';
import { SEAT, Seats, Turn } from '../../../models';
import Seat, { SeatState } from './seat';
import { observe } from '../../../store';
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
  };
}

export default function (meta: Props[]) {
  const seats = new Container();
  seats.name = 'seats';
  seats.once('added', init(seats, meta));

  return seats;
}
