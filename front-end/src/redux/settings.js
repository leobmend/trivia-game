import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: '999',
  difficulty: 'any',
  type: 'any',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state.category = action.payload.category;
      state.difficulty = action.payload.difficulty;
      state.type = action.payload.type;
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
