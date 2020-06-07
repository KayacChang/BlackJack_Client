import { Container, DisplayObject } from 'pixi.js';
import { setAnchor, setPosition } from './utils';
import { Hierarchy, Children, isMetaData, MetaData } from '.';
import { isArray, isObject } from 'util';

function Metadata(data: MetaData) {
  const { element, position, anchor } = data;

  if (position) {
    setPosition(position, element);
  }
  if (anchor) {
    setAnchor(anchor, element);
  }

  return element;
}

function List(...data: DisplayObject[]) {
  const list = new Container();

  data.forEach((element, index) => {
    element.name = String(index);

    list.addChild(element);
  });

  return list;
}

function Group(data: Record<string, DisplayObject | DisplayObject[]>) {
  const group = new Container();

  Object.entries(data)
    //
    .forEach(([name, element]) => {
      //
      if (isArray(element)) {
        const list = List(...element);

        group.addChild(list);

        return;
      }

      element.name = name;

      group.addChild(element);
    });

  return group;
}

export default abstract class Element extends Container {
  //
  abstract get view(): Hierarchy;

  stage: Children = {};

  constructor() {
    super();
    this.init();
  }

  private init() {
    this.create(this.view);
  }

  protected addStage(name: string, element: DisplayObject) {
    element.name = name;

    this.addChild(element);

    this.stage[name] = element;
  }

  private create(hierarchy: Hierarchy) {
    //
    Object.entries(hierarchy).forEach(([name, data]) => {
      //
      if (data instanceof DisplayObject) {
        this.addStage(name, data);

        return;
      }

      if (isMetaData(data)) {
        this.addStage(name, Metadata(data));

        return;
      }

      if (isArray(data)) {
        this.addStage(name, List(...data));

        return;
      }

      if (isObject(data)) {
        this.addStage(name, Group(data));

        return;
      }
    });

    this.onCreate(this.stage);
  }

  protected onCreate(children: Children) {}
}
