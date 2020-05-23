import { Scene } from "../core";

export default class MainScene extends Scene {
  //
  render() {
    //
    return {
      background: {
        transform: {
          position: {
            x: 0,
            y: 0,
          },
          rotation: {
            x: 0,
            y: 0,
          },
          scale: {
            x: 1,
            y: 1,
          },
        },
        render: {
          type: "Sprite",
          texture: "BG_IMG",
        },
      },
    };
  }
}
