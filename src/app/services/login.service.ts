import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../common/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = "http://localhost:8082/api/customer/loginHandle";

  constructor(private httpClient: HttpClient) { }

  checkIfValid(Login: Login):Observable<any>{
    console.log("Inside email check"+Login.email);
    return this.httpClient.post<Login>(this.apiUrl,Login);
  }
}
