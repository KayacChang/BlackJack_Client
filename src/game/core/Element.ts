import { Container } from 'pixi.js';
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

  create(children: Hierarchy) {
    const stage: Children = {};

    for (const [name, data] of Object.entries(children)) {
      //
      if (data instanceof Element) {
        data.name = name;
        this.addChild(data);
        stage[name] = data;

        continue;
      }

      const { element, position, anchor } = data;

      element.name = name;
      this.addChild(element);
      stage[name] = element;

      if (position) {
        setPosition(position, element);
      }
      if (anchor) {
        setAnchor(anchor, element);
      }
    }

    this.onCreate(stage);
  }
}
