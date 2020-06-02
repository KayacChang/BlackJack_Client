import { Loader } from 'pixi.js';
import TABLE from './table';
import SEAT from './seat';
import POKER from './poker';

const PKG = {
  ...TABLE,
  ...SEAT,
  ...POKER,
};

const loader = new Loader();

async function load() {
  for (const [name, url] of Object.entries(PKG)) {
    loader.add(name, url);
  }

  return new Promise((resolve, reject) => {
    loader.load(resolve);

    loader.onError.add(reject);
  });
}

function get(res: keyof typeof PKG) {
  //
  return loader.resources[res];
}

export default {
  load,
  get,
};
