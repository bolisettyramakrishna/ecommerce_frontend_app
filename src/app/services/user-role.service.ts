import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService {
  // BehaviorSubject to store the current role
  private userRole = new BehaviorSubject<string>('normalUser'); // Default role is 'normalUser'
  
  // Observable to allow components to subscribe to role changes
  userRole$ = this.userRole.asObservable();

  constructor() {}

  // Method to set the user role and store it in sessionStorage
  setUserRole(role: string) {
    sessionStorage.setItem('role', role);  // Persist the role in sessionStorage
    this.userRole.next(role);  // Notify all subscribers of the new role
  }

  // Method to get the current user role from sessionStorage
  getUserRole(): string {
    return sessionStorage.getItem('role') || 'normalUser';  // Get role or default to 'normalUser'
  }
}
