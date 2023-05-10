import { createContext } from 'react';
import { CartItem, CartProduct } from '../interfaces';

export interface CartContextProps {
  readonly cart: CartItem[];
  readonly addToCart: (product: CartProduct) => void;
  readonly removeFromCart: (productId: number) => void;
  readonly clearCart: () => void;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: (product: CartProduct) => {},
  removeFromCart: (productId: number) => {},
  clearCart: () => {},
});
