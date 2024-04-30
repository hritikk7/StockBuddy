import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedStock: null,
};

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
    },
  },
});

export const { setSelectedStock } = stocksSlice.actions;

export default stocksSlice.reducer;