import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersAPI from '../services/usersAPI';

const initialState = {
  loading: false,
  error: '',
  info: {
    id: '',
    userToken: '',
    email: '',
    name: '',
  },
};

const fetchLogin = createAsyncThunk(
  'player/fetchLogin',
  async ({ email, password }) => {
    const { token: userToken, id } = await usersAPI.login({ email, password });
    const { name } = await usersAPI.getById(id, userToken);
    const info = { id, userToken, email, name };
    return info;
  },
);

const fetchSignUp = createAsyncThunk(
  'player/fetchSignUp',
  async ({ email, password }) => {
    const { token: userToken, id } = await usersAPI.signUp(
      { email, password, name: 'Player' },
    );
    const info = { id, userToken, email, name: 'Player' };
    return info;
  },
);

const fetchEditUser = createAsyncThunk(
  'player/fetchEditUser',
  async ({ id, userToken, name, email }) => {
    await usersAPI.update(id, userToken, { name, email });
    const info = { id, userToken, email, name };
    return info;
  },
);

const playerSlice = createSlice({
  name: 'player',
  initialState,
  extraReducers: (builder) => {
    [fetchLogin, fetchSignUp, fetchEditUser].forEach((fetchFunc) => {
      builder.addCase(fetchFunc.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchFunc.fulfilled, (state, action) => {
        state.loading = false;
        state.info = { ...action.payload };
        state.error = '';
      });
      builder.addCase(fetchFunc.rejected, (state, action) => {
        console.log(state, action);
        state.loading = false;
        state.error = action.error.message;
      });
    });
  },
});

export { fetchLogin, fetchSignUp, fetchEditUser };
export default playerSlice.reducer;
