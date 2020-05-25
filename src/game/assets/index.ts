import { Loader } from 'pixi.js';

import TABLE_TITLE from './table/blackjack.png';
import TABLE_GREEN from './table/green.jpg';
import TABLE_BLUE from './table/table_blue.jpg';
import TABLE_RED from './table/table_red.jpg';

const PKG = {
  TABLE_TITLE,
  TABLE_GREEN,
  TABLE_BLUE,
  TABLE_RED,
};

const loader = new Loader();

async function load() {
  //
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
