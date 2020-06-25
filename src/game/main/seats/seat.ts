import { Sprite, Container, Text } from 'pixi.js';
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

  const field = Field();
  field.y = 170;
  it.addChild(field);

  it.on('statechange', onStateChange(it, field, id));

  return it;
}

function Field() {
  const it = new Container();

  const background = new Sprite(RES.get('FIELD').texture);
  background.anchor.set(0.5);
  background.tint = 0x333333;
  it.addChild(background);

  const field = new Text('', {
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fill: 0xffffff,
    fontSize: 48,
  });
  field.anchor.set(0.5);
  it.addChild(field);

  it.on('update', (player: string) => {
    field.text = player;
  });

  return it;
}

function onStateChange(it: Sprite, field: Container, id: SEAT) {
  //
  const select_normal = RES.get('SELECT_SEAT_NORMAL').texture;
  const select_enable = RES.get('SELECT_SEAT_ENABLE').texture;
  const seat_normal = RES.get('SEAT_NORMAL').texture;
  const seat_enable = RES.get('SEAT_ENABLE').texture;

  const onPlaceBet = placeBet(id);

  return function (state: SeatState, player: string) {
    //
    it.off('pointerdown', onPlaceBet);

    if (state === SeatState.Empty) {
      it.texture = select_normal;

      field.visible = false;

      it.once('pointerdown', throttleBy(join(id)));

      return;
    }

    if (state === SeatState.Occupy) {
      it.texture = seat_normal;

      return;
    }

    if (state === SeatState.OccupyByUser) {
      it.texture = seat_enable;

      field.visible = true;
      field.emit('update', player);

      it.on('pointerdown', onPlaceBet);

      return;
    }
  };
}

function placeBet(seat: SEAT) {
  //
  return function () {
    const { game, bet, user } = store.getState();

    if (!bet.chosen) {
      return;
    }

    if (user.totalBet + bet.chosen.amount > game.bet.max) {
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
