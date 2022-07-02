import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import triviaUsersAPI from '../services/triviaUsersAPI';

const initialState = {
  loading: false,
  error: '',
  info: {
    userToken: '',
    email: '',
    name: '',
  },
};

const fetchLogin = createAsyncThunk(
  'player/fetchLogin',
  async ({ email, password }) => {
    const { token: userToken, name } = await triviaUsersAPI.login({ email, password });
    const info = { userToken, email, name };
    return info;
  },
);

const fetchSignUp = createAsyncThunk(
  'player/fetchSignUp',
  async ({ email, password }) => {
    const { token: userToken } = await triviaUsersAPI.signUp(
      { email, password, name: 'Player' },
    );
    const info = { userToken, email, name: 'Player' };
    return info;
  },
);

const playerSlice = createSlice({
  name: 'player',
  initialState,
  extraReducers: (builder) => {
    [fetchLogin, fetchSignUp].forEach((fetchFunc) => {
      builder.addCase(fetchFunc.pending, (state) => { state.loading = true; });
      builder.addCase(fetchFunc.fulfilled, (state, action) => {
        state.loading = false;
        state.info = { ...action.payload };
        state.error = '';
      });
      builder.addCase(fetchFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    });
  },
});

export { fetchLogin, fetchSignUp };
export default playerSlice.reducer;
