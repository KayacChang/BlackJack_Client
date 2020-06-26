import { Text } from 'pixi.js';

export default function GameText(text: string, styles = {}) {
  //
  return new Text(text, {
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fill: 0xffffff,
    fontSize: 48,
    ...styles,
  });
}
