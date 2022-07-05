import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersAPI from '../services/usersAPI';

const HTTP_SUCCESS = 200;

const initialState = {
  loading: false,
  editing: '',
  lastStatus: '',
  info: {
    id: '',
    userToken: '',
    email: '',
    name: '',
  },
};

const fetchLogin = createAsyncThunk(
  'player/fetchLogin',
  async ({ setLocalStorage, email, password }) => {
    const { data: { token: userToken, id } } = await usersAPI.login({ email, password });
    const { data: { name } = {}, status } = await usersAPI.getById(userToken);
    if (status === HTTP_SUCCESS) setLocalStorage('trivia-user-token', userToken);
    const info = { id, userToken, email, name };
    return { info, status };
  },
);

const fetchGetInfo = createAsyncThunk(
  'player/fetchGetInfo',
  async ({ userToken }) => {
    const { data: { id, name, email } = {}, status } = await usersAPI.getById(userToken);
    const info = {
      id, email, name, userToken: status === HTTP_SUCCESS ? userToken : '',
    };
    return { info, status };
  },
);

const fetchSignUp = createAsyncThunk(
  'player/fetchSignUp',
  async ({ setLocalStorage, email, password }) => {
    const { data: { token: userToken, id } = {}, status } = await usersAPI.signUp(
      { email, password, name: 'Player' },
    );
    if (status === HTTP_SUCCESS) setLocalStorage('trivia-user-token', userToken);
    const info = { id, userToken, email, name: 'Player' };
    return { info, status };
  },
);

const fetchEditUser = createAsyncThunk(
  'player/fetchEditUser',
  async ({ id, userToken, name, email }) => {
    const { status } = await usersAPI.update(id, userToken, { name, email });
    const info = { id, userToken, email, name };
    return { info, status };
  },
);

const fetchEditPassword = createAsyncThunk(
  'player/fetchEditPassword',
  async ({ id, userToken, password }) => {
    const { status } = await usersAPI.updatePassword(id, userToken, { password });
    return { status };
  },
);

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setEditing: (state, action) => { state.editing = action.payload; },
  },
  extraReducers: (builder) => {
    [fetchLogin, fetchGetInfo, fetchSignUp, fetchEditUser, fetchEditPassword].forEach(
      (fetchFunc) => {
        builder.addCase(fetchFunc.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(fetchFunc.fulfilled, (state, action) => {
          state.loading = false;
          if (action.payload.info) {
            state.info = { ...action.payload.info };
          }
          state.lastStatus = action.payload.status;
          state.editing = '';
        });
      },
    );
  },
});

export { fetchLogin, fetchGetInfo, fetchSignUp, fetchEditUser, fetchEditPassword };
export const { setEditing } = playerSlice.actions;
export default playerSlice.reducer;
