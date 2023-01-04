import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CART } from '../constants';

const initialState = {
  entities: [],
  status: null,
};

const cartSlice = createSlice({
  name: CART,
  initialState,
  reducers: {
    itemAdded(state: any, action: any) {
      const product = action.payload;
      const itemIndex = state.entities.findIndex(
        (item: any) => item.id === product.id,
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
    itemRemoved(state: any, action: PayloadAction<number>) {
      const itemIndex = state.entities.findIndex(
        (item: any) => item.id === action.payload,
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
