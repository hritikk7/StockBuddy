import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToOrder: (state, action) => {
      state.orderItems.push(action.payload);
    },
    removeOrder: (state, action) => {
      state.orderItems = state.orderItems.filter(
        item => item.symbol !== action.payload,
      );
    },
  },
});

export const {addToOrder, removeOrder} = orderSlice.actions;
export default orderSlice.reducer;
