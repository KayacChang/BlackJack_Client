import { Sprite } from 'pixi.js';
import Res from '../assets';
import Element from '../core/Element';
import { Children } from '../core';

export default class Background extends Element {
  //
  get view() {
    return {
      table: new Sprite(Res.get('TABLE_BLUE').texture),
      title: {
        element: new Sprite(Res.get('TABLE_TITLE').texture),
        anchor: {
          x: 0.5,
          y: 0.5,
        },
      },
    };
  }

  onCreate({ table, title }: Children) {
    title.x = (table as Sprite).width / 2;
    title.y = (table as Sprite).height / 3;
  }
}
