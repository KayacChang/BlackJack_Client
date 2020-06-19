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
  const disable = RES.get('SELECT_SEAT_NORMAL').texture;
  const enable = RES.get('SELECT_SEAT_ENABLE').texture;

  const onClick = join(id);

  return function (state: boolean) {
    //
    if (state) {
      it.texture = enable;

      return;
    }

    it.texture = disable;

    it.once('pointerdown', throttleBy(onClick));
  };
}

function join(id: SEAT) {
  //
  return async function () {
    //
    await services.joinSeat(id);
  };
}
