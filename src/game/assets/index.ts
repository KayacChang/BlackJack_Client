import { Loader } from 'pixi.js';

import TABLE_TITLE from './table/blackjack.png';
import TABLE_GREEN from './table/green.jpg';
import TABLE_BLUE from './table/table_blue.jpg';
import TABLE_RED from './table/table_red.jpg';
import TABLE_GRAY from './table/gray.jpg';

import SELECT_SEAT_NORMAL from './seat/MultiSeat.png';
import SELECT_SEAT_ENABLE from './seat/MultiSeat_On.png';

import SEAT_NORMAL from './seat/Seat.png';
import SEAT_ENABLE from './seat/Seat_On.png';

import Field from './seat/Field.png';
import Join from './seat/Join.png';

const PKG = {
  TABLE_TITLE,
  TABLE_GREEN,
  TABLE_BLUE,
  TABLE_RED,
  TABLE_GRAY,

  SELECT_SEAT_NORMAL,
  SELECT_SEAT_ENABLE,
  SEAT_NORMAL,
  SEAT_ENABLE,

  Field,
  Join,
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
