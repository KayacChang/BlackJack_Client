import { Application, Container, Sprite, Texture } from 'pixi.js';
import Background from './Background';
import Res from '../assets';

export default class Main extends Container {
  //
  constructor(app: Application) {
    super();

    const bg = new Background({
      width: app.screen.width,
      height: app.screen.height,
    });

    this.addChild(bg);

    const seatA = new Seat();
    seatA.x = this.width * (50 / 100);
    seatA.y = this.height * (80 / 100);

    const seatB = new Seat();
    seatB.x = this.width * (28 / 100);
    seatB.y = this.height * (70 / 100);

    const seatC = new Seat();
    seatC.x = this.width * (72 / 100);
    seatC.y = this.height * (70 / 100);

    const seatD = new Seat();
    seatD.x = this.width * (12.5 / 100);
    seatD.y = this.height * (50 / 100);

    const seatE = new Seat();
    seatE.x = this.width * (87.5 / 100);
    seatE.y = this.height * (50 / 100);

    this.addChild(seatA, seatB, seatC, seatD, seatE);
  }
}

class Seat extends Sprite {
  normal: Texture;
  enable: Texture;

  constructor() {
    super();

    this.normal = Res.get('SEAT_NORMAL').texture;
    this.enable = Res.get('SEAT_ENABLE').texture;

    this.texture = this.normal;
    this.anchor.set(0.5);
  }
}
