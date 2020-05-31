import { Container, Sprite } from 'pixi.js';
import Res from '../assets';
import GameObject from './GameObject';

class Select extends GameObject {
  //
  constructor() {
    super({
      normal: {
        element: new Sprite(Res.get('SELECT_SEAT_NORMAL').texture),
        anchor: 0.5,
      },
      enable: {
        element: new Sprite(Res.get('SELECT_SEAT_ENABLE').texture),
        anchor: 0.5,
      },
      join: {
        element: new Sprite(Res.get('Join').texture),
        position: {
          y: '-90%',
        },
        anchor: 0.5,
      },
    });
  }
}

class Player extends GameObject {
  //
  constructor() {
    super({
      normal: {
        element: new Sprite(Res.get('SEAT_NORMAL').texture),
        anchor: 0.5,
      },
      enable: {
        element: new Sprite(Res.get('SEAT_ENABLE').texture),
        anchor: 0.5,
      },
    });
  }
}

export default class Seat extends Container {
  //
  constructor() {
    super();

    const player = new Player();
    player.visible = true;
    this.addChild(player);

    const select = new Select();
    select.visible = false;
    this.addChild(select);

    this.scale.set(0.75);
  }
}
