import { Container, DisplayObject, Sprite } from 'pixi.js';
import { Node } from '.';
import RES from '../assets';

export default function render(name: string, child: Node) {
  //
  return renderSprite(name, child) || renderContainer(name, child);
}

function renderContainer(name: string, child: Node) {
  const it = new Container();

  if (child.children) {
    it.name = name;

    it.addChild(...renderChildren(child.children));

    return it;
  }

  return it;
}

function renderSprite(name: string, child: Node) {
  const config = child.components?.sprite as any;

  if (!config) {
    return;
  }

  if (!config.texture) {
    throw new Error(`Sprite require texture to render`);
  }

  const it = new Sprite(RES.get(config.texture).texture);

  requestAnimationFrame(() => {
    //
    if (config.anchor) {
      //
      if (typeof config.anchor === 'number') {
        it.anchor.set(config.anchor);

        return;
      }

      const { x = 0, y = 0 } = config.anchor;

      it.anchor.set(x, y);
    }
    //
  });

  it.name = name;

  return it;
}

function renderChildren(children: Record<string, Node>) {
  return (
    Object.entries(children)
      //
      .map(([name, child]) => render(name, child))
      .filter(Boolean) as DisplayObject[]
  );
}
