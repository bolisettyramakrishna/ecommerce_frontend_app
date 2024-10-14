import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';
import { PaymentVerificationPayload } from '../common/payment-verification-payload';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private checkoutUrl = 'http://localhost:9090/api/orders/create-order'; 

  private paymentCallbackUrl = 'http://localhost:9090/api/orders/payment-verification'

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<any>(this.checkoutUrl, purchase);
  }

  // Send payment data to backend for verification
  verifyPayment(paymentPayload: PaymentVerificationPayload): Observable<any> {
    return this.httpClient.post<any>(this.paymentCallbackUrl, paymentPayload);
  }
}
