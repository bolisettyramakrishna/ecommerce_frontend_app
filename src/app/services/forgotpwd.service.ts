import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpwdService {

  private apiUrl = "http://localhost:8082/api/customer/forgotPwdHandle";

  constructor(private httpClient: HttpClient) { }

  sendMail(email: string): Observable<any> {
    const url = `${this.apiUrl}/${email}`;
    return this.httpClient.post<any>(url, {}); // Send an empty body or your payload as needed
  }

}
