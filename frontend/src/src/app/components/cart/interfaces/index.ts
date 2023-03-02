export interface CartProduct {
  id: number | string;
  name: string;
  price: number;
  type: string;
}

export type CartItem = CartProduct & {
  quantity: number;
};
export interface CartState {
  entities: CartItem[];

  status: string | null;
}

export interface PaymentItem {
  id: number | string;
  type: string;
}
