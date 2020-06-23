import { Container } from 'pixi.js';
import { SEAT, Seats } from '../../../models';
import Seat, { SeatState } from './seat';
import { observe } from '../../../store';

type Props = {
  id: SEAT;
  x: number;
  y: number;
};

function update(seats: Container[]) {
  //
  function findSeat(id: string) {
    const _id = Number(id) as SEAT;

    return seats.find(({ name }) => name === SEAT[_id]);
  }

  return function (state: Seats) {
    //
    for (const [id, seat] of Object.entries(state)) {
      //
      const found = findSeat(id);

      if (!seat.player) {
        found?.emit('statechange', SeatState.Empty);

        continue;
      }

      found?.emit('statechange', SeatState.OccupyByUser, seat.player);
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
  };
}

export default function (meta: Props[]) {
  const seats = new Container();
  seats.name = 'seats';
  seats.once('added', init(seats, meta));

  return seats;
}
