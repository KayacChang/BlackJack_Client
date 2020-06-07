import { Container, DisplayObject } from 'pixi.js';
import { setAnchor, setPosition } from './utils';
import { Hierarchy, Children, MetaData } from '.';
import { isArray } from 'util';

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

    const byType = (name: string, data: MetaData | DisplayObject) => {
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
    };

    Object.entries(hierarchy).forEach(([name, data]) => {
      //
      if (isArray(data)) {
        const group = new Container();

        if (data.length > 0) {
          group.addChild(...data);
        }

        byType(name, group);

        return;
      }

      byType(name, data);
    });

    this.onCreate(stage);
  }
}
