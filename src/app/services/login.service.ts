import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../common/login';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
  private tokenKey = 'authToken';
  private userKey = 'authUser';

  // BehaviorSubject to hold the role dynamically
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();
  

  constructor(private httpClient: HttpClient, 
    private router: Router, 
    private userRoleService: UserRoleService) {
      this.restoreSession(); // Restore session on service initialization
    }

    login(userData: any) {
      console.log('Login method called with:', userData); // Debugging
      // Save token and user details to localStorage after login
      localStorage.setItem(this.tokenKey, userData.token);
      localStorage.setItem(this.userKey, JSON.stringify(userData.user));
      this.setUserRole(userData.user.role);  // If role-based logic exists
      console.log('Login successful. Token and user data saved to localStorage.'); // Debugging
    }

    isLoggedIn() {
      // Check if token exists in localStorage
      return !!localStorage.getItem(this.tokenKey);
    }

    restoreSession() {
      const token = localStorage.getItem(this.tokenKey);
      const user = localStorage.getItem(this.userKey);
      console.log('Restoring session - Token:', token, 'User:', user); // Debugging
      if (token && user) {
        this.setUserRole(JSON.parse(user).role); // Restore user role if applicable
      }else {
        console.log('No session found, logging out.'); // Debugging
        this.logout(); 
      }
    }
  setUserRole(role: any) {
   // Update the current role and notify all subscribers (components, etc.)
   this.userRoleSubject.next(role);
  }

  getUserRole(): string | null {
    // Directly return the current role value
    return this.userRoleSubject.value;
  }

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

     // Remove login data from localStorage on logout
     localStorage.removeItem(this.tokenKey);
     localStorage.removeItem(this.userKey);
     this.setUserRole(null);  // Reset user role
  }

  
}
