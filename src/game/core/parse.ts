import { Sprite } from 'pixi.js';
import RES from '../assets';

type Node = {
  children?: Record<string, Node>;
  components?: Record<string, {}>;
};

export default function serialize(node: Node) {
  //
  const it: Node = {};

  if (node.components) {
    it.components = createComponents(node.components);
  }

  if (!node.children) {
    return it;
  }

  it.children = Object.entries(node.children)
    //
    .reduce((children, [name, child]) => {
      //
      children[name] = serialize(child);

      return children;
      //
    }, {} as Record<string, Node>);

  return it;
}

function createComponents(components: Record<string, {}>) {
  const comps: Record<string, any> = {};

  for (const [type, component] of Object.entries(components)) {
    const func = byType(type);

    comps[type] = func(component as any);
  }

  return comps;
}

function byType(type: string) {
  //
  if (type === 'sprite') {
    return SpriteRenderer;
  }

  throw new Error(`The Type[${type}] Not supported...`);
}

function SpriteRenderer(data: any) {
  const texture = RES.get(data.texture).texture;

  return new Sprite(texture);
}
