import { OrderItems } from './OrderItems.interface';

export interface OrderCheckout {
  orderItems: OrderItems[];
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: number;
  state: string;
  country: string;
  phone: number;
  user: string;
  totalPrice: number;
}
