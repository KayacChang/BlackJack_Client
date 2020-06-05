import Res from '../assets';
import POKER from '../assets/poker';
import { Sprite, SimpleMesh, Container } from 'pixi.js';
import { gsap, Power0 } from 'gsap';

type Suit = 'SPADE' | 'HEART' | 'CLUB' | 'DIAMOND';
type Rank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export default class Poker extends Container {
  //
  back: Face;
  front: Face;

  private _rank: Rank;
  get rank() {
    return this._rank;
  }

  private _suit: Suit;
  get suit() {
    return this._suit;
  }

  constructor(suit: Suit, rank: Rank) {
    super();

    const back = new Face('BACK');
    const front = new Face(`${suit}_${rank}` as keyof typeof POKER);
    this.addChild(front, back);

    this._rank = rank;
    this._suit = suit;
    this.back = back;
    this.front = front;
    this.interactive = true;
    this.buttonMode = true;

    this.on('pointerdown', () => this.onClick());
  }

  private fliping = false;

  async onClick() {
    if (this.fliping) return;

    this.fliping = true;

    const [front, back] = this.children as SimpleMesh[];

    await flip(back, front, 0.5);

    this.swapChildren(back, front);

    this.fliping = false;
  }
}

class Face extends SimpleMesh {
  //
  constructor(res: keyof typeof POKER) {
    super();

    const sprite = new Sprite(Res.get(res).texture);
    this.addChild(sprite);

    requestAnimationFrame(() => {
      this.vertices = (sprite as any)['vertexData'];
    });
  }
}

function flip(back: SimpleMesh, front: SimpleMesh, duration: number) {
  //
  const origin = Array.from(back.vertices);
  const [x1, y1, x2, y2, , y3, ,] = origin;

  const width = x2 - x1;
  const height = y3 - y2;

  // points
  const a = [x1 + width * 0.5, y1 + height * 0.1];
  const b = [x1 + width * 0.5, y1 + height * -0.1];
  const c = [x1 + width * 0.5, y1 + height * 1];
  const d = [x1 + width * 0.5, y1 + height * 0.9];

  Object.assign(front.vertices, [...b, ...a, ...d, ...c]);

  return gsap
    .timeline()
    .add(tween(back, [...a, ...b, ...c, ...d], duration / 2))
    .add(tween(front, origin, duration / 2))
    .then();

  function tween(card: SimpleMesh, vertices: number[], duration: number) {
    //
    const state = vertices as any;

    return gsap.to(card.vertices, {
      ...state,
      duration,
      ease: Power0.easeIn,
    });
  }
}
