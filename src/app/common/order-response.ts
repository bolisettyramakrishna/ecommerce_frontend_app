import { CustomerResponse } from './customer-response';

export class OrderResponse {
  orderId: number = 0;
  createdDate: string = '';
  orderStatus: string = '';
  totalPrice: number = 0;
  updatedDate: string = '';
  customer!: CustomerResponse;
}
