import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersAPI from '../services/usersAPI';

const initialState = {
  loading: false,
  error: '',
  editing: '',
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

const fetchEditPassword = createAsyncThunk(
  'player/fetchEditPassword',
  async ({ id, userToken, password }) => {
    await usersAPI.updatePassword(id, userToken, { password });
  },
);

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setEditing: (state, action) => { state.editing = action.payload; },
    setUserToken: (state, action) => { state.info.userToken = action.payload; },
  },
  extraReducers: (builder) => {
    [fetchLogin, fetchSignUp, fetchEditUser, fetchEditPassword].forEach((fetchFunc) => {
      builder.addCase(fetchFunc.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchFunc.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.info = { ...action.payload };
        state.error = '';
        state.editing = '';
      });
      builder.addCase(fetchFunc.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.editing = '';
      });
    });
  },
});

export { fetchLogin, fetchSignUp, fetchEditUser, fetchEditPassword };
export const { setEditing, setUserToken } = playerSlice.actions;
export default playerSlice.reducer;
