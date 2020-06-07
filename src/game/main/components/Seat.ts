import { Sprite } from 'pixi.js';
import Res from '../../assets';
import { Element } from '../../core';

class Select extends Element {
  //
  get view() {
    return {
      normal: {
        element: new Sprite(Res.get('SELECT_SEAT_NORMAL').texture),
        anchor: {
          x: 0.5,
          y: 0.5,
        },
      },
      enable: {
        element: new Sprite(Res.get('SELECT_SEAT_ENABLE').texture),
        anchor: {
          x: 0.5,
          y: 0.5,
        },
      },
      join: {
        element: new Sprite(Res.get('Join').texture),
        position: {
          y: -200,
        },
        anchor: {
          x: 0.5,
          y: 0.5,
        },
      },
    };
  }

  onCreate() {}
}

class Player extends Element {
  //
  get view() {
    return {
      normal: {
        element: new Sprite(Res.get('SEAT_NORMAL').texture),
        anchor: {
          x: 0.5,
          y: 0.5,
        },
      },
      enable: {
        element: new Sprite(Res.get('SEAT_ENABLE').texture),
        anchor: {
          x: 0.5,
          y: 0.5,
        },
      },
    };
  }

  onCreate() {}
}

export default class Seat extends Element {
  //
  get view() {
    return {
      player: new Player(),
      // select: new Select(),
    };
  }

  onCreate() {
    this.scale.set(0.75);
  }
}
