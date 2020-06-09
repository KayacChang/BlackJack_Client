import { Sprite } from 'pixi.js';
import RES from '../assets';

type Node = {
  children?: Record<string, Node>;
  components?: Record<string, {}>;
};

export default function serialize(name: string, node: Node) {
  //
  if (node.components) {
    node.components = addComponents(node.components);
  }

  if (!node.children) {
    return;
  }

  for (const [name, child] of Object.entries(node.children)) {
    serialize(name, child);
  }
}

function addComponents(components: Record<string, {}>) {
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
