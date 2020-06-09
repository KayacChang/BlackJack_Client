import Res from './assets';
import Game from './core/game';
import { parse, render } from './core';

export default async function main(view: HTMLCanvasElement) {
  const app = Game(view);

  await Res.load();

  const stage = parse(await import('./main/stage.json'));

  app.stage.addChild(render('main', stage));
}
