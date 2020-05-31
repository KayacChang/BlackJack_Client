import { Container } from 'pixi.js';
import Background from './Background';
import Seat from './Seat';

export default class Main extends Container {
  //
  constructor() {
    super();

    const bg = new Background();
    this.addChild(bg);

    const seatA = new Seat();
    seatA.x = this.width * (50 / 100);
    seatA.y = this.height * (82 / 100);

    const seatB = new Seat();
    seatB.x = this.width * (30 / 100);
    seatB.y = this.height * (75 / 100);

    const seatC = new Seat();
    seatC.x = this.width * (70 / 100);
    seatC.y = this.height * (75 / 100);

    const seatD = new Seat();
    seatD.x = this.width * (15 / 100);
    seatD.y = this.height * (58 / 100);

    const seatE = new Seat();
    seatE.x = this.width * (85 / 100);
    seatE.y = this.height * (58 / 100);

    this.addChild(seatA, seatB, seatC, seatD, seatE);
  }
}
