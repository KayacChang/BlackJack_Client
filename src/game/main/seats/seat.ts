import { Sprite } from 'pixi.js';
import RES from '../../assets';
import { SEAT } from '../../../models';
import { throttleBy } from '../../../utils';
import services from '../../../services';
import store from '../../../store';
import { addBet } from '../../../store/actions';

interface Prop {
  id: SEAT;
  x: number;
  y: number;
}

export enum SeatState {
  Empty,
  Occupy,
  OccupyByUser,
}

export default function Seat({ id, x, y }: Prop) {
  //
  const it = Object.assign(new Sprite(), {
    buttonMode: true,
    interactive: true,
    name: SEAT[id],
    x: x,
    y: y,
  });

  it.anchor.set(0.5);
  it.scale.set(0.75);

  it.on('statechange', onStateChange(it, id));

  return it;
}

function onStateChange(it: Sprite, id: SEAT) {
  //
  const select_normal = RES.get('SELECT_SEAT_NORMAL').texture;
  const select_enable = RES.get('SELECT_SEAT_ENABLE').texture;
  const seat_normal = RES.get('SEAT_NORMAL').texture;
  const seat_enable = RES.get('SEAT_ENABLE').texture;

  const onPlaceBet = placeBet(id);

  return function (state: SeatState) {
    //
    it.off('pointerdown', onPlaceBet);

    if (state === SeatState.Empty) {
      it.texture = select_normal;

      it.once('pointerdown', throttleBy(join(id)));

      return;
    }

    if (state === SeatState.Occupy) {
      it.texture = seat_normal;

      return;
    }

    if (state === SeatState.OccupyByUser) {
      it.texture = seat_enable;

      it.on('pointerdown', onPlaceBet);

      return;
    }
    //
  };
}

function placeBet(seat: SEAT) {
  //
  return function () {
    const { bet } = store.getState();

    if (!bet.chosen) {
      return;
    }

    store.dispatch(
      addBet({
        ...bet.chosen,
        time: new Date(),
        seat,
      })
    );
  };
}

function join(id: SEAT) {
  //
  return async function () {
    //
    await services.joinSeat(id);
  };
}
