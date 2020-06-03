import Res from '../assets';
import { Sprite, SimpleMesh, Texture, Container } from 'pixi.js';
import { gsap, Power0 } from 'gsap';

function Face(texture: Texture) {
  const it = new SimpleMesh();

  const sprite = new Sprite(texture);

  it.addChild(sprite);

  requestAnimationFrame(() => {
    it.vertices = (sprite as any)['vertexData'];
  });

  return it;
}

export default class Card extends Container {
  back: SimpleMesh;
  front: SimpleMesh;
  fliping = false;

  constructor() {
    super();

    const back = Face(Res.get('BACK').texture);
    this.back = back;

    const front = Face(Res.get('CLUB_10').texture);
    this.front = front;

    this.addChild(front, back);

    this.interactive = true;
    this.buttonMode = true;

    this.on('pointerdown', () => this.flip(0.5));
  }

  flip(duration: number) {
    if (this.fliping) return;

    this.fliping = true;

    const origin = Array.from(this.back.vertices);
    const [x1, y1, x2, y2, x3, y3, x4, y4] = origin;

    const width = x2 - x1;
    const height = y3 - y2;

    const originState = { ...Array.from(origin) } as any;
    const frontState = {
      ...Array.from([
        x1 + width * 0.5,
        y1 + height * 0.1,
        x1 + width * 0.5,
        y1 + height * -0.1,
        x1 + width * 0.5,
        y1 + height * 1,
        x1 + width * 0.5,
        y1 + height * 0.9,
      ]),
    } as any;

    this.front.vertices[0] = x1 + width * 0.5;
    this.front.vertices[1] = y1 + height * -0.1;
    this.front.vertices[2] = x1 + width * 0.5;
    this.front.vertices[3] = y1 + height * 0.1;
    this.front.vertices[4] = x1 + width * 0.5;
    this.front.vertices[5] = y1 + height * 0.9;
    this.front.vertices[6] = x1 + width * 0.5;
    this.front.vertices[7] = y1 + height * 1;

    return gsap
      .timeline()
      .add(
        gsap.to(this.back.vertices, {
          ...frontState,
          duration: duration / 2,
          ease: Power0.easeIn,
        })
      )
      .add(
        gsap.to(this.front.vertices, {
          ...originState,
          duration: duration / 2,
          ease: Power0.easeIn,
        })
      )
      .add(() => {
        const front = this.front;
        this.front = this.back;
        this.back = front;

        this.fliping = false;
      });
  }
}
