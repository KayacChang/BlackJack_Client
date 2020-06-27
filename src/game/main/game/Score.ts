import { Container, Graphics } from 'pixi.js';
import GameText from '../text';

export default function Score(score: number) {
  const [width, height] = [108, 76];

  const it = new Container();

  const background = new Graphics();
  background.beginFill(0x000, 0.7);
  background.drawRoundedRect(-0.5 * width, -0.5 * height, width, height, 16);
  background.endFill();
  it.addChild(background);

  const field = GameText(String(score));
  field.anchor.set(0.5);
  it.addChild(field);

  return it;
}
