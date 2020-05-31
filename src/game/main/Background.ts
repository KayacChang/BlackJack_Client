import { Sprite, Container } from 'pixi.js';
import Res from '../assets';

export default class Background extends Container {
  //
  constructor() {
    super();

    const background = new Sprite(Res.get('TABLE_BLUE').texture);
    this.addChild(background);

    const title = new Sprite(Res.get('TABLE_TITLE').texture);
    title.x = this.width / 2;
    title.y = this.height / 3;
    title.anchor.set(0.5);
    this.addChild(title);
  }
}
