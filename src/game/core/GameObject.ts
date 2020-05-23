import { Sprite } from "./component";

type RenderComponent = {
  type: string;
};

type Props = {
  name: string;
  components: any;
};

export default class GameObject {
  //
  [component_name: string]: any;

  name: string;

  constructor(props: Props) {
    //
    this.name = props.name;

    for (const [type, component] of Object.entries(props.components)) {
      //
      this.addComponent(type, component);
    }
  }

  addComponent(type: string, component: any) {
    //
    if (type === "render") {
      //
      component = component as RenderComponent;

      if (component.type === "Sprite") {
        //
        const sprite = Sprite(component);

        sprite.name = this.name;

        this[type] = sprite;
      }
    }
  }
}
