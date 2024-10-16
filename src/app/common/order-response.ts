import { Address } from './address';
import { CustomerResponse } from './customer-response';

export class OrderResponse {
  orderTrackingNum: string = '';
  email: string = '';
  orderId: number = 0;
  dateCreated: string = '';
  orderStatus: string = '';
  totalPrice: number = 0;
  totalQuantity: number = 0;
  razorPayPaymentId: string = '';
  updatedDate: string = '';
  address!: Address;
  customer!: CustomerResponse;
}
