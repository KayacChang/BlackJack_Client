import { combineReducers } from 'redux';

import game from './game';
import room from './room';
import user from './user';
import seat from './seat';
import hand from './hand';

export default combineReducers({
  game,
  user,
  room,
  seat,
  hand,
});
