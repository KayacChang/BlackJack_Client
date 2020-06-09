import { Container, DisplayObject } from 'pixi.js';
import { isSprite } from '.';

type Node = {
  children?: Record<string, Node>;
  components?: Record<string, {}>;
};

export default function render(children: Record<string, Node>) {
  //
  return (
    Object.entries(children)
      //
      .map(byType)
      .filter(Boolean) as DisplayObject[]
  );
}

function byType([name, child]: [string, Node]) {
  //
  return renderContainer(name, child) || renderSprite(name, child);
}

function renderContainer(name: string, child: Node) {
  const target = child.children;

  if (target) {
    const it = new Container();

    it.name = name;

    it.addChild(...render(target));

    return it;
  }

  return undefined;
}

function renderSprite(name: string, child: Node) {
  const target = child.components?.sprite;

  if (target && isSprite(target)) {
    target.name = name;

    return target;
  }

  return undefined;
}
