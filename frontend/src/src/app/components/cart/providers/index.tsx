import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CartContext } from '../context';
import { itemAdded, itemRemoved, clear } from '../slices/cartSlice';
import { cartSelector } from '../selectors';

export interface Props {
  readonly children: ReactNode;
}

export const CartProvider = ({ children }: Props) => {
  const dispatch = useDispatch();

  const addToCart = (product: any) => {
    dispatch(itemAdded(product));
  };

  const removeFromCart = (productId: number) => {
    dispatch(itemRemoved(productId));
  };

  const clearCart = () => {
    dispatch(clear());
  };

  const cart = useSelector(cartSelector);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
