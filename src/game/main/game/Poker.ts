import Res from '../../assets';
import POKER from '../../assets/poker';
import { Sprite, SimpleMesh, Container, Texture } from 'pixi.js';
import gsap from 'gsap';
import { Power0 } from 'gsap/gsap-core';
import { SUIT, RANK } from '../../../models';

export default class Poker extends Container {
  //
  duration = 0.5;
  front: Face;

  constructor(suit: SUIT, rank: RANK) {
    super();

    const back = new Face('BACK');
    const front = new Face(`${suit}_${rank}` as keyof typeof POKER);
    this.addChild(back, front);

    this.front = front;
  }

  _faceUp = true;

  get faceUp() {
    return this._faceUp;
  }
  set faceUp(flag: boolean) {
    const [face1, face2] = this.children;

    this.swapChildren(face2, face1);

    this._faceUp = flag;
  }

  private _fliping = false;

  async flip(suit: SUIT, rank: RANK) {
    if (this._fliping) return;

    this._fliping = true;

    const [front, back] = this.children as SimpleMesh[];

    front.texture = Res.get(`${suit}_${rank}` as keyof typeof POKER).texture;
    await flip(back, front, this.duration, suit, rank);

    this.faceUp = !this.faceUp;

    this._fliping = false;
  }
}

class Face extends SimpleMesh {
  //
  sprite: Sprite;

  set texture(texture: Texture) {
    this.sprite.texture = texture;
  }

  constructor(res: keyof typeof POKER) {
    super();

    const sprite = new Sprite(Res.get(res).texture);
    this.addChild(sprite);
    sprite.anchor.set(0.5);

    this.sprite = sprite;

    this.once('added', () => {
      this.vertices = (sprite as any)['vertexData'];
    });
  }
}

function flip(back: SimpleMesh, front: SimpleMesh, duration: number, suit: SUIT, rank: RANK) {
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

  front.alpha = 0;

  return gsap
    .timeline()
    .add(tween(back, [...a, ...b, ...c, ...d], duration / 2))
    .call(() => (front.alpha = 1))
    .call(() => Object.assign(front, [...b, ...a, ...d, ...c]))
    .add(tween(front, origin, duration / 2))
    .then();

  function tween(card: SimpleMesh, to: number[], duration: number) {
    //
    return gsap.to(card.vertices, {
      ...(to as any),
      duration,
      ease: Power0.easeIn,
    });
  }
}
