import { Container } from 'pixi.js';
import render from '../core/render';
import parse from '../core/parse';

import stage from './stage.json';

type Node = {
  children?: Record<string, Node>;
  components?: Record<string, {}>;
};

export default function Main() {
  const _stage = parse(stage as Node);

  const it = new Container();

  if (_stage.children) {
    it.addChild(...render(_stage.children));
  }

  return it;
}
