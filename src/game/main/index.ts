import { Application, Container } from 'pixi.js';
import Background from './Background';

export default class Main extends Container {
  //
  constructor(app: Application) {
    super();

    const bg = new Background({
      width: app.screen.width,
      height: app.screen.height,
    });

    this.addChild(bg);
  }
}
