import { Sprite } from 'pixi.js';
import Package from '../Resource';

export default function SpriteComponent({ texture }: SpriteComponent) {
  const res = Package.get(texture);

  return new Sprite(res.texture);
}
