import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../common/login';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserRoleService } from './user-role.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8082/api/customer/loginHandle';
  session: any = null;
  adminEmail: string = 'admin@gmail.com';
  adminPassword: string = 'admin123';
  

  constructor(private httpClient: HttpClient, private router: Router, private userRoleService: UserRoleService) {}

  checkIfAdmin(Login: Login) {
    if (
      this.adminEmail == Login.email &&
      this.adminPassword == Login.password
    ) {
      this.session = { username: 'admin' };
      console.log('Inside email check' + Login.email + ' ' + Login.password);
      return true;
    }
    return false;
  }
  checkIfValid(Login: Login): Observable<any> {
    console.log('Inside email check' + Login.email + ' ' + Login.password);
    console.log(this.httpClient.post<Login>(this.apiUrl, Login));
    return this.httpClient.post<Login>(this.apiUrl, Login);
  }
  logout() {
    this.session = null;

    // Set role to 'normalUser' via UserRoleService
    this.userRoleService.setUserRole('normalUser'); 

    // Remove role from session storage
    sessionStorage.removeItem('role');

    // Navigate to home page after logout
    this.router.navigate(['/']);
  }

  
}
