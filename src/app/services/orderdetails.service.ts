import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orderdetails } from '../common/orderdetails';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

  private apiUrl='http://localhost:9090/api/orders/getOrderDetails';

  constructor(private httpClient: HttpClient) { }
  
  findOrdersByEmail(email:string):Observable<Orderdetails[]>{
    const url = `${this.apiUrl}/${email}`;
    return this.httpClient.get<Orderdetails[]>(url);
  }
}
