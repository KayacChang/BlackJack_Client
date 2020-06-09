//
import stage from './stage.json';
import { Application, Container, Sprite } from 'pixi.js';

function onCreate(app: Application) {
  const background = app.stage.getChildByName('background') as Container;

  const title = background.getChildByName('title') as Sprite;

  title.x = background.width / 2;
  title.y = background.height / 3;
}

export default {
  name: 'main',
  stage,
  onCreate,
};
