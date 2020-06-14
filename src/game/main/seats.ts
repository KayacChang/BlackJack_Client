import { Container, Sprite } from 'pixi.js';
import RES from '../assets';
import { createMachine, interpret } from 'xstate';
import { SEAT } from '../../models';

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } },
  },
});

const seats = [
  { name: SEAT.A, x: 15 / 100, y: 58 / 100 },
  { name: SEAT.B, x: 30 / 100, y: 75 / 100 },
  { name: SEAT.C, x: 50 / 100, y: 82 / 100 },
  { name: SEAT.D, x: 70 / 100, y: 75 / 100 },
  { name: SEAT.E, x: 85 / 100, y: 58 / 100 },
];

function Seat() {
  const it = new Container();

  const normal = RES.get('SELECT_SEAT_NORMAL').texture;
  const enable = RES.get('SELECT_SEAT_ENABLE').texture;

  const sprite = new Sprite(normal);
  sprite.anchor.set(0.5);

  it.addChild(sprite);

  it.buttonMode = true;
  it.interactive = true;

  return it;
}

export default function Seats() {
  const it = new Container();
  it.name = 'seats';

  it.once('added', ({ width, height }: Container) => {
    for (const { name, x, y } of seats) {
      const seat = Seat();
      seat.name = name;

      seat.x = width * x;
      seat.y = height * y;

      it.addChild(seat);

      const toggleService = interpret(toggleMachine)
        .onTransition((state) => {
          if (state.value === 'active') {
            console.log(name);
          }
        })
        .start();

      seat.on('pointerdown', () => toggleService.send('TOGGLE'));
    }
  });

  return it;
}
