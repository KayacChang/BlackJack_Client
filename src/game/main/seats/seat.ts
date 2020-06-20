import { Sprite } from 'pixi.js';
import RES from '../../assets';
import { SEAT } from '../../../models';
import { throttleBy } from '../../../utils';
import services from '../../../services';

interface Prop {
  id: SEAT;
  x: number;
  y: number;
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

  it.on('statechange', onStateChange(it, id));

  it.emit('statechange', false);

  return it;
}

function onStateChange(it: Sprite, id: SEAT) {
  //
  const select_normal = RES.get('SELECT_SEAT_NORMAL').texture;
  const select_enable = RES.get('SELECT_SEAT_ENABLE').texture;
  const seat_normal = RES.get('SEAT_NORMAL').texture;
  const seat_enable = RES.get('SEAT_ENABLE').texture;

  return function (state: boolean) {
    //
    if (state) {
      it.texture = seat_enable;

      return;
    }

    it.texture = select_normal;

    it.once('pointerdown', throttleBy(join(id)));
  };
}

function join(id: SEAT) {
  //
  return async function () {
    //
    await services.joinSeat(id);
  };
}
