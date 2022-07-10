import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import triviaAPI from '../services/triviaAPI';

const initialState = {
  loading: false,
  error: '',
  token: '',
  questions: [],
  categories: [],
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
    const {
      results: questions, response_code: responseCode,
    } = await triviaAPI.getQuestions(
      { token, category, difficulty, type },
    );
    return { questions, responseCode };
  },
);

const fetchCategories = createAsyncThunk(
  'trivia/fetchCategories',
  async () => {
    const { trivia_categories: categoriesFetched } = await triviaAPI.getCategories();
    const categories = [{ id: 999, name: 'Any' }, ...categoriesFetched];
    return { categories };
  },
);

const triviaSlice = createSlice({
  name: 'trivia',
  initialState,
  reducers: {
    resetQuestions: (state) => { state.questions = []; },
    resetResponseCode: (state) => { state.responseCode = 0; },
  },
  extraReducers: (builder) => {
    [fetchToken, fetchQuestions, fetchCategories].forEach(
      (fetchFunc) => {
        builder.addCase(fetchFunc.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(fetchFunc.fulfilled, (state, { payload }) => {
          state.loading = false;
          if (payload.token) state.token = payload.token;
          if (payload.questions) state.questions = payload.questions;
          if (payload.categories) state.categories = payload.categories;
          if (payload.responseCode) state.responseCode = payload.responseCode;
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

export { fetchToken, fetchQuestions, fetchCategories };
export const { resetQuestions, resetResponseCode } = triviaSlice.actions;
export default triviaSlice.reducer;
