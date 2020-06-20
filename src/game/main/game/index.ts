import { Container } from 'pixi.js';
import Path from '../path';
import Pokers from './pokers';
import { observe } from '../../../store';
import { Hand } from '../../../models';

export default function Game() {
  const container = new Container();
  container.name = 'game';

  const path = Path();
  container.addChild(path);

  const pokers = Pokers();
  container.addChild(pokers);

  observe((state) => state.hand, update);

  return container;
}

function update(hand: Hand[]) {
  console.log(hand);
}
