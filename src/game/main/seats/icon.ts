import { Container, Sprite } from 'pixi.js';
import RES from '../../assets';
import GameText from '../text';

export function Win() {
  const result = new Container();

  const icon = new Sprite(RES.get('ICON_WIN').texture);
  icon.anchor.set(0.5);
  result.addChild(icon);

  const text = GameText('WIN', { fill: 0x000000, fontSize: 36 });
  text.anchor.set(0.5);
  text.position.set(0, 76);
  result.addChild(text);

  return result;
}

export function Lose() {
  const result = new Container();

  const icon = new Sprite(RES.get('ICON_LOSE').texture);
  icon.anchor.set(0.5);
  result.addChild(icon);

  const text = GameText('LOSE', { fontSize: 36 });
  text.anchor.set(0.5);
  text.position.set(0, 65);
  result.addChild(text);

  return result;
}

export function Bust() {
  const result = new Container();

  const icon = new Sprite(RES.get('ICON_BUST').texture);
  icon.anchor.set(0.5);
  result.addChild(icon);

  const text = GameText('BUST', { fontSize: 36 });
  text.anchor.set(0.5);
  text.position.set(0, 65);
  result.addChild(text);

  return result;
}
