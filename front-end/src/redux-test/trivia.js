import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import triviaAPI from '../services/triviaAPI';

const initialState = {
  loading: false,
  error: '',
  token: '',
  questions: [],
  responseCode: 0,
};

const fetchToken = createAsyncThunk(
  'trivia/fetchToken',
  async () => {
    const { token } = await triviaAPI.getToken();
    return { token };
  },
);

const fetchQuestions = createAsyncThunk(
  'trivia/fetchQuestions',
  async ({ token, category, difficulty, type }) => {
    const { results: questions } = await triviaAPI.getQuestions(
      { token, category, difficulty, type },
    );
    return { questions };
  },
);

const triviaSlice = createSlice({
  name: 'trivia',
  initialState,
  reducers: {
    resetQuestions: (state) => { state.questions = []; },
  },
  extraReducers: (builder) => {
    [fetchToken, fetchQuestions].forEach(
      (fetchFunc) => {
        builder.addCase(fetchFunc.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(fetchFunc.fulfilled, (state, action) => {
          state.loading = false;
          if (action.payload.token) state.token = action.payload.token;
          if (action.payload.questions) state.questions = action.payload.questions;
          state.error = '';
        });
        builder.addCase(fetchFunc.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
      },
    );
  },
});

export { fetchToken, fetchQuestions };
export const { resetQuestions } = triviaSlice.actions;
export default triviaSlice.reducer;
