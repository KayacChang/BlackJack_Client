import { Container } from 'pixi.js';
import render from '../core/render';
import parse from '../core/parse';

import stage from './stage.json';

type Node = {
  children?: Record<string, Node>;
  components?: Record<string, {}>;
};

export default function Main() {
  parse('stage', stage as Node);

  const it = new Container();
  it.addChild(...render(stage.children));

  return it;
}
