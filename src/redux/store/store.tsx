import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import stockReducer from './stockSlice';
import orderReducer from './orderSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    stocks: stockReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
