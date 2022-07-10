import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assertions: 0,
  scorePoints: 0,
};

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setScore: (state, action) => {
      state.assertions += 1;
      state.scorePoints += action.payload;
    },
    resetScore: (state) => {
      state.assertions = 0;
      state.scorePoints = 0;
    },
  },
});

export const { setScore, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
