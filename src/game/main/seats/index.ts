import { Container, Sprite } from 'pixi.js';
import { SEAT, Seat as SeatModel } from '../../../models';
import Seat from './seat';
import { observe } from '../../../store';

const config = [
  { id: SEAT.A, x: 15 / 100, y: 58 / 100 },
  { id: SEAT.B, x: 30 / 100, y: 75 / 100 },
  { id: SEAT.C, x: 50 / 100, y: 82 / 100 },
  { id: SEAT.D, x: 70 / 100, y: 75 / 100 },
  { id: SEAT.E, x: 85 / 100, y: 58 / 100 },
];

function update(seats: Sprite[]) {
  //
  return function (state: SeatModel[]) {
    //
    state.forEach(({ id }) => {
      const found = seats.find(({ name }) => name === SEAT[id]);

      if (!found) {
        return;
      }

      found.emit('statechange', true);
    });
  };
}

function init(container: Container) {
  //
  return function onInit({ width, height }: Container) {
    //
    const seats = config.map(({ id, x, y }) =>
      Seat({
        id: id,
        x: width * x,
        y: height * y,
      })
    );

    container.addChild(...seats);

    observe((state) => state.seat, update(seats));
  };
}

export default function Seats() {
  const seats = new Container();
  seats.name = 'seats';
  seats.once('added', init(seats));

  return seats;
}
