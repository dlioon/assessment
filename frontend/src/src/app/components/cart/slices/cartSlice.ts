import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CART } from '../constants';
import { CartItem, CartState } from '../interfaces';

const initialState: CartState = {
  entities: [],
  status: null,
};

const cartSlice = createSlice({
  name: CART,
  initialState,
  reducers: {
    itemAdded(state: CartState, action: PayloadAction<CartItem>) {
      const product = action.payload;
      const itemIndex = state.entities.findIndex(
        ({ id }: CartItem) => id === product.id,
      );

      if (itemIndex < 0) {
        state.entities.push({ ...product, quantity: 1 });
      } else {
        const updatedItem = {
          ...state.entities[itemIndex],
        };
        updatedItem.quantity++;
        state.entities[itemIndex] = updatedItem;
      }
    },
    itemRemoved(state: CartState, action: PayloadAction<number>) {
      const itemIndex = state.entities.findIndex(
        ({ id }: CartItem) => id === action.payload,
      );

      const updatedItem = {
        ...state.entities[itemIndex],
      };
      updatedItem.quantity--;
      if (updatedItem.quantity <= 0) {
        state.entities.splice(itemIndex, 1);
      } else {
        state.entities[itemIndex] = updatedItem;
      }
    },
    clear(state) {
      state.entities = [];
    },
  },
});

export const { itemAdded, itemRemoved, clear } = cartSlice.actions;

export default cartSlice.reducer;
