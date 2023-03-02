export interface Number {
  id: string;
  number: string;
  status: string;
  price: number;
}

export interface ChangeNumberStatus {
  id: number | string;
  status: string;
}
