import { Container, Sprite } from 'pixi.js';
import RES from '../assets';
import { SEAT } from '../../models';
import { throttleBy } from '../../utils';
import services from '../../services';

interface Prop {
  id: SEAT;
  x: number;
  y: number;
}

const seats = [
  { id: SEAT.A, x: 15 / 100, y: 58 / 100 },
  { id: SEAT.B, x: 30 / 100, y: 75 / 100 },
  { id: SEAT.C, x: 50 / 100, y: 82 / 100 },
  { id: SEAT.D, x: 70 / 100, y: 75 / 100 },
  { id: SEAT.E, x: 85 / 100, y: 58 / 100 },
];

function Seat({ id, x, y }: Prop) {
  const it = new Container();

  const normal = RES.get('SELECT_SEAT_NORMAL').texture;
  const enable = RES.get('SELECT_SEAT_ENABLE').texture;

  const sprite = new Sprite(normal);
  sprite.anchor.set(0.5);

  it.addChild(sprite);

  it.buttonMode = true;
  it.interactive = true;

  it.name = SEAT[id];
  it.x = x;
  it.y = y;

  it.on('pointerdown', throttleBy(onSeatClick(id)));

  return it;
}

function onSeatClick(seat: SEAT) {
  //
  return async function () {
    const seats = await services.joinSeat(seat);

    console.log(seats);
  };
}

export default function Seats() {
  const it = new Container();
  it.name = 'seats';

  it.once('added', ({ width, height }: Container) => {
    for (const { id, x, y } of seats) {
      const seat = Seat({
        id: id,
        x: width * x,
        y: height * y,
      });

      it.addChild(seat);
    }
  });

  return it;
}
