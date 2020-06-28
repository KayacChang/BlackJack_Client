import { combineReducers } from 'redux';

import game from './game';
import room from './room';
import user from './user';
import seat from './seat';
import hand from './hand';
import bet from './bet';
import decision from './decision';

export default combineReducers({
  game,
  user,
  room,
  seat,
  hand,
  bet,
  decision,
});
