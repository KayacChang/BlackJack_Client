import { Container, Sprite, DisplayObject } from 'pixi.js';
import { setAnchor, setPosition } from '../utils';
import { Hierarchy, Children } from '.';

export default abstract class Element extends Container {
  //
  abstract get view(): Hierarchy;
  abstract onCreate(children: Children): void;

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.create(this.view);
  }

  create(hierarchy: Hierarchy) {
    const stage: Children = {};

    const addToStage = (name: string, element: Element | Sprite | DisplayObject) => {
      element.name = name;
      this.addChild(element);
      stage[name] = element;
    };

    Object.entries(hierarchy).forEach(([name, data]) => {
      //
      if (data instanceof Element || data instanceof Sprite) {
        addToStage(name, data);
        return;
      }

      const { element, position, anchor } = data;

      addToStage(name, element);

      if (position) {
        setPosition(position, element);
      }
      if (anchor) {
        setAnchor(anchor, element);
      }
    });

    this.onCreate(stage);
  }
}
