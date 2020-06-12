import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import room from './room';
import user from './user';

const rootReducer = combineReducers({
  user,
  room,
});

const middlewares = [
  //
  thunkMiddleware,
];

export type AppState = ReturnType<typeof rootReducer>;

export default createStore(
  //
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
