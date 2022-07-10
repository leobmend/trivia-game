import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersAPI from '../services/usersAPI';

const TOP_TWENTY_SIZE = 20;
const MINUS_ONE = -1;

const initialState = {
  loading: false,
  topTwenty: [],
};

const fetchRanking = createAsyncThunk(
  'ranking/fetchRanking',
  async (userToken) => {
    const { data } = await usersAPI.getTopTwenty(userToken);
    const topTwenty = data.sort(({ maxScore: maxScoreA }, { maxScore: maxScoreB }) => {
      if (Number(maxScoreA) < Number(maxScoreB)) return 1;
      return MINUS_ONE;
    }).filter((_, index) => index < TOP_TWENTY_SIZE);

    return { topTwenty };
  },
);

const rankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {
    resetRanking: (state) => { state.topTwenty = []; },
  },
  extraReducers: (builder) => {
    [fetchRanking].forEach(
      (fetchFunc) => {
        builder.addCase(fetchFunc.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(fetchFunc.fulfilled, (state, { payload }) => {
          state.loading = false;
          if (payload.topTwenty) { state.topTwenty = [...payload.topTwenty]; }
        });
      },
    );
  },
});

export { fetchRanking };
export const { resetRanking } = rankingSlice.actions;
export default rankingSlice.reducer;
