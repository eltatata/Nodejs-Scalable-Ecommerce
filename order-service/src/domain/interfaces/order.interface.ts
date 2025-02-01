import { Item } from './item.interface';

export interface CreateOrderData {
  userId: string;
  items: Item[];
  address: string;
  totalAmount: number;
}
