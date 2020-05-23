import { Sprite, Transform } from '../component';

function newRenderComponent(type: string, comp: RenderComponent, self: Entity) {
  //
  if (type === 'Sprite') {
    const sprite = Sprite(comp as SpriteComponent);

    sprite.name = self.name;

    return sprite;
  }
}

function newComponent(type: string, comp: any, self: Entity) {
  //
  if (type === 'transform') {
    return Transform(comp);
  }

  if (type === 'render') {
    comp = comp as RenderComponent;

    return newRenderComponent(comp.type, comp, self);
  }
}

type Props = {
  name: string;
  components: any;
};

export default class Entity {
  //
  name: string;
  components = new Map<string, any>();

  constructor({ name, components }: Props) {
    //
    this.name = name;

    for (const [type, component] of Object.entries(components)) {
      const comp = newComponent(type, component, this);

      this.components.set(type, comp);
    }
  }
}
