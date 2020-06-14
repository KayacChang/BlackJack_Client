import { Container, Sprite, Application } from 'pixi.js';
import RES from '../assets';

export default function Scene(app: Application): Container {
  const scene = new Container();
  scene.name = 'main';

  const background = Background();
  scene.addChild(background);

  const seats = Seats();
  scene.addChild(seats);

  return scene;
}

function Background() {
  const it = new Container();
  it.name = 'background';

  const table = new Sprite(RES.get('TABLE_BLUE').texture);
  table.name = 'table';

  const title = new Sprite(RES.get('TABLE_TITLE').texture);
  title.name = 'title';

  title.x = table.width / 2;
  title.y = table.height / 3;
  title.anchor.set(0.5);

  it.addChild(table, title);

  return it;
}

/*
    seatA.x = width * (15 / 100);
    seatA.y = height * (58 / 100);

    seatB.x = width * (30 / 100);
    seatB.y = height * (75 / 100);

    seatC.x = width * (50 / 100);
    seatC.y = height * (82 / 100);

    seatD.x = width * (70 / 100);
    seatD.y = height * (75 / 100);

    seatE.x = width * (85 / 100);
    seatE.y = height * (58 / 100);
*/

function Seats() {
  const it = new Container();
  it.name = 'seats';

  const texture = RES.get('SELECT_SEAT_NORMAL').texture;
  const seatA = new Sprite(texture);
  const seatB = new Sprite(texture);
  const seatC = new Sprite(texture);
  const seatD = new Sprite(texture);
  const seatE = new Sprite(texture);

  it.addChild(seatA, seatB, seatC, seatD, seatE);

  it.once('added', ({ width, height }: Container) => {
    seatA.x = width * (15 / 100);
    seatA.y = height * (58 / 100);

    seatB.x = width * (30 / 100);
    seatB.y = height * (75 / 100);

    seatC.x = width * (50 / 100);
    seatC.y = height * (82 / 100);

    seatD.x = width * (70 / 100);
    seatD.y = height * (75 / 100);

    seatE.x = width * (85 / 100);
    seatE.y = height * (58 / 100);

    for (const seat of [seatA, seatB, seatC, seatD, seatE]) {
      seat.anchor.set(0.5);
    }
  });

  return it;
}
