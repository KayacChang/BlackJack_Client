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

  private create(hierarchy: Hierarchy) {
    const stage: Children = {};

    const addToStage = (name: string, element: DisplayObject) => {
      this.addChild(element);

      element.name = name;
      stage[name] = element;
    };

    Object.entries(hierarchy).forEach(([name, data]) => {
      //
      if (data instanceof DisplayObject) {
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
