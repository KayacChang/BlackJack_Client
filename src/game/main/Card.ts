import Res from '../assets';
import { Sprite, SimpleMesh, Graphics, Container } from 'pixi.js';

export default function Card() {
  const mesh = new SimpleMesh();

  const card = new Sprite(Res.get('BACK').texture);

  mesh.addChild(card);

  requestAnimationFrame(() => {
    mesh.vertices = (card as any)['vertexData'];

    console.log(mesh.vertices);
  });

  return mesh;
}
