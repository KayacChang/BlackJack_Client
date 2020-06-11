import { observable, reaction, set, toJS } from 'mobx';
import newRound from './round';
import { Round, Props } from './type';

const round = observable({
  // properties
  id: '',
  seats: [],
  shoe: 0,
  state: {
    type: 0,
    seat: 0,
    pair: 0,
  },
} as Round);

const cancel = reaction(() => round.id, onRoundStart);

function onRoundStart() {
  console.groupCollapsed('Round Start');
  console.log(toJS(round));
  console.groupEnd();
}

function start(data: Props) {
  //
  set(round, newRound(data));

  return round;
}

export default {
  start,
};
