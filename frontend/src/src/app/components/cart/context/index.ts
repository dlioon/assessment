import { createContext } from 'react';

export interface CartContextProps {
  readonly cart: any;
  readonly addToCart: (product: any) => void;
  readonly removeFromCart: (productId: number) => void;
  readonly clearCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: (product: any) => {},
  removeFromCart: (productId: number) => {},
  clearCart: () => {},
});
