import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './player';
import scoreReducer from './score';
import triviaReducer from './trivia';
import loadingReducer from './loading';
import settingsReducer from './settings';
import rankingReducer from './ranking';

export default configureStore({
  reducer: {
    player: playerReducer,
    score: scoreReducer,
    trivia: triviaReducer,
    loading: loadingReducer,
    settings: settingsReducer,
    ranking: rankingReducer,
  },
});
