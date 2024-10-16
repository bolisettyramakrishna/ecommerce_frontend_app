import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Dashboard } from '../common/dashboard';
import { OrderResponse } from '../common/order-response';
import { Orderhistory } from '../common/orderhistory';
import { Productresponse } from '../common/productresponse';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private dashBoardAPIUrl = 'http://localhost:8084/api/admin/dashboard';
  public filterAPIUrl = 'http://localhost:8084/api/admin/filter';
  public productUrl = 'http://localhost:8084/api/admin/orderItems?orderId=';
  public orderResponse: OrderResponse[] = [];

  constructor(public httpclient: HttpClient) {}

  public getDashboardDetials(): Observable<Dashboard> {
    return this.httpclient
      .get<Dashboard>(this.dashBoardAPIUrl)
      .pipe(map((response) => response));
  }

  public searchForOrders(
    orderHistory?: Orderhistory
  ): Observable<OrderResponse[]> {
    return this.httpclient.post<OrderResponse[]>(
      this.filterAPIUrl,
      orderHistory
    );
  }

  public fetchProductData(orderId: number): Observable<Productresponse[]> {
    this.productUrl = this.productUrl + orderId;
    return this.httpclient
      .get<Productresponse[]>(this.productUrl)
      .pipe(map((response) => response));
  }
}
