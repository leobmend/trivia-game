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
    return token;
  },
);

const triviaSlice = createSlice({
  name: 'trivia',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.error = '';
    });
    builder.addCase(fetchToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export { fetchToken };
export const { setToken } = triviaSlice.actions;
export default triviaSlice.reducer;
