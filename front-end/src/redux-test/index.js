import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './player';
import scoreReducer from './score';
import triviaReducer from './trivia';

export default configureStore({
  reducer: {
    player: playerReducer,
    score: scoreReducer,
    trivia: triviaReducer,
  },
});
