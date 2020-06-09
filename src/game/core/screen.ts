import { Application, utils } from 'pixi.js';

const Quad_HD = Object.freeze({
  width: 2960,
  height: 1440,
  ratio: 2960 / 1440,
});

const Dynamic = Object.freeze({
  width: window.innerHeight * Quad_HD.ratio,
  height: window.innerHeight,
});

export function getSize() {
  return utils.isMobile.any ? Dynamic : Quad_HD;
}

export function resize(app: Application) {
  //
  return function () {
    const x = app.screen.width / Quad_HD.width;
    const y = app.screen.height / Quad_HD.height;

    app.stage.scale.set(x, y);
  };
}
