import { createSelector } from '@reduxjs/toolkit';

export const cartSelector = createSelector(
  (state: any) => state.cart.entities,
  entities => entities,
);
