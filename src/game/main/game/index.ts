import { Container } from 'pixi.js';
import Path from '../path';
import Pokers from './pokers';

export default function Game() {
  const container = new Container();
  container.name = 'game';

  const path = Path();
  container.addChild(path);

  const pokers = Pokers();
  container.addChild(pokers);

  return container;
}
