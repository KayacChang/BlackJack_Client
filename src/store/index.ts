import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';

const middlewares = [thunkMiddleware];

export type AppState = ReturnType<typeof reducer>;

export default createStore(
  //
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
