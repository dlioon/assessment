import { configureStore } from '@reduxjs/toolkit';

import cartReducer from 'app/components/cart/slices/cartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
