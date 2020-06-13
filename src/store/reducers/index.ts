import { combineReducers } from 'redux';

import game from './game';
import room from './room';
import user from './user';

export default combineReducers({
  game,
  user,
  room,
});
