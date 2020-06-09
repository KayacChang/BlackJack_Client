import { Container, DisplayObject } from 'pixi.js';
import { isSprite, Node } from '.';

export default function byType(name: string, child: Node) {
  //
  return renderSprite(name, child) || render(name, child);
}

function render(name: string, child: Node) {
  const it = new Container();

  if (child.children) {
    it.name = name;

    it.addChild(...renderChildren(child.children));

    return it;
  }

  return it;
}

function renderSprite(name: string, child: Node) {
  const it = child.components?.sprite;

  if (it && isSprite(it)) {
    it.name = name;

    return it;
  }

  return undefined;
}

function renderChildren(children: Record<string, Node>) {
  return (
    Object.entries(children)
      //
      .map(([name, child]) => byType(name, child))
      .filter(Boolean) as DisplayObject[]
  );
}
