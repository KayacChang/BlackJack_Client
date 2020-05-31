import { Container, DisplayObject } from 'pixi.js';
import { setAnchor, setPosition } from '../utils';

type MetaData = {
  element: DisplayObject;
  position?: Vec2;
  anchor?: number;
};

type Props = { [name: string]: MetaData };

export default class GameObject extends Container {
  //
  constructor(props: Props) {
    super();

    for (const [name, data] of Object.entries(props)) {
      //
      const { element, position, anchor } = data;

      element.name = name;
      this.addChild(element);

      if (position) {
        setPosition(position, [element]);
      }

      if (anchor) {
        setAnchor(anchor, [element]);
      }
    }
  }
}
