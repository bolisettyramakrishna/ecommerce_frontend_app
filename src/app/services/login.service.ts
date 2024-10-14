import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../common/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  session: any = null;
  adminEmail: string = 'admin@gmail.com';
  adminPassword: string = 'admin123';

  private apiUrl = "http://localhost:8082/api/customer/loginHandle";

  constructor(private httpClient: HttpClient) { }

  checkIfAdmin(Login: Login) {
    if (this.adminEmail == Login.email && this.adminPassword == Login.password) {
      this.session = { username: 'admin' };
      console.log("Inside email check" + Login.email + " " + Login.password);
      return true;
    }
    return false;
  }
  checkIfValid(Login: Login): Observable<any> {
    console.log("Inside email check" + Login.email + " " + Login.password);
    console.log(this.httpClient.post<Login>(this.apiUrl, Login));
    return this.httpClient.post<Login>(this.apiUrl, Login);
  }
  logout() {
    this.session = null;
  }
}
