import { Container } from "pixi.js";
import GameObject from "./GameObject";

export default abstract class Scene {
  //
  abstract render(): {};

  view: Container;

  constructor() {
    const root = new Container();

    const stage = this.render();

    for (const [name, components] of Object.entries(stage)) {
      //
      const obj = new GameObject({ name, components });

      if (obj.render) {
        //
        root.addChild(obj.render);
      }
    }

    this.view = root;
  }
}
