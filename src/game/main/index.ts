import { Container, Application } from 'pixi.js';
import Background from './background';
import Seats from './seats';

export default function Scene(app: Application): Container {
  const scene = new Container();
  scene.name = 'main';

  const background = Background();
  scene.addChild(background);

  const seats = Seats();
  scene.addChild(seats);

  return scene;
}
