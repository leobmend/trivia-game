/* import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

if (window.Cypress) {
  window.store = store;
}

export default store; */

import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './player';
import scoreReducer from './score';

export default configureStore({
  reducer: {
    player: playerReducer,
    score: scoreReducer,
  },
});
