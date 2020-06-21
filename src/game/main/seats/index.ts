import { Container, Sprite } from 'pixi.js';
import { SEAT, Seat as SeatModel } from '../../../models';
import Seat, { SeatState } from './seat';
import { observe } from '../../../store';

type Props = {
  id: SEAT;
  x: number;
  y: number;
};

function update(seats: Sprite[]) {
  //
  return function (state: SeatModel[]) {
    //
    state.forEach(({ id }) => {
      const found = seats.find(({ name }) => name === SEAT[id]);

      if (!found) {
        return;
      }

      found.emit('statechange', SeatState.OccupyByUser);
    });
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

    seats.forEach((seat) => seat.emit('statechange', SeatState.OccupyByUser));

    observe((state) => state.seat, update(seats));
  };
}

export default function Seats(meta: Props[]) {
  const seats = new Container();
  seats.name = 'seats';
  seats.once('added', init(seats, meta));

  return seats;
}
