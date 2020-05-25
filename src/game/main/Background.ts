import { Sprite, Texture } from 'pixi.js';
import Res from '../assets';

interface Textures {
  blue: Texture;
  red: Texture;
  green: Texture;
}

type Props = {
  width: number;
  height: number;
};

export default class Background extends Sprite {
  //
  textures: Textures;

  constructor({ width, height }: Props) {
    super();

    const textures = {
      blue: Res.get('TABLE_BLUE').texture,
      red: Res.get('TABLE_RED').texture,
      green: Res.get('TABLE_GREEN').texture,
    };

    this.textures = textures;
    this.texture = textures.red;

    this.width = width;
    this.height = height;

    const title = new Sprite(Res.get('TABLE_TITLE').texture);
    title.x = title.width / 2;
    title.y = title.height / 2;
    this.addChild(title);
  }

  change(background: keyof Textures) {
    //   TODO
  }
}
