import { Component, OnChanges, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { SearchComponent } from './search/search.component';
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegisterComponent } from './register/register.component';
import { LoginService } from './services/login.service';
import { UserRoleService } from './services/user-role.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    ProductListComponent,
    CommonModule,
    ProductCategoryComponent,
    SearchComponent,
    CheckoutComponent,
    LoginComponent,
    AdmindashboardComponent,
    ResetpasswordComponent,
    RegisterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ecommerce_frontend';
  userRole: String = '';
  cartQuantity = 0;
  cartTotal = 0;
  

  constructor(private cartService: CartService,private LoginService :LoginService, private userRoleService: UserRoleService,) {
   // Load session and cart info in the constructor
   this.LoginService.restoreSession();  // Restore session if exists
   this.cartService.loadCart();  // Restore cart from localStorage
   this.updateCartDetails();  // Initialize cart details
  }

  ngOnInit(): void {
    this.cartService.totalQuantity$.subscribe(
      (quantity) => {
        console.log('Updated cart quantity:', quantity); 
        (this.cartQuantity = quantity)}
    );

    this.cartService.totalPrice$.subscribe(
      (totalPrice) => {
        console.log('Updated cart total price:', totalPrice); 
        this.cartTotal = totalPrice;
      }
    );

    
  //   this.LoginService.restoreSession(); 
  //   this.cartService.loadCart(); 

  //   this.userRole = sessionStorage.getItem('role') || 'normalUser'; 
  //   this.userRole = this.LoginService.getUserRole() || 'normalUser';
  //  console.log('AppComponent - UserRole after session restore:', this.userRole); // Debugging

  //  // Subscribe to userRole$ to get the current user role
  //  this.userRoleService.userRole$.subscribe(role => {
  //   this.userRole = role;
  //   console.log('User role updated in AppComponent:', this.userRole);
  //   this.userRole = this.userRoleService.getUserRole();
  // });

  // Get initial user role from session storage
  this.userRole = this.userRoleService.getUserRole();
  console.log('AppComponent - UserRole after session restore:', this.userRole);

  // Subscribe to userRole$ to get the current user role
  this.userRoleService.userRole$.subscribe(role => {
    this.userRole = role;
    console.log('User role updated in AppComponent:', this.userRole);
  });
  
  }

  

  updateCartDetails() {
    // Sync cart totals with service
    this.cartQuantity = this.cartService.getTotalQuantity();
    this.cartTotal = this.cartService.getTotalPrice();
  }

  

  
  
}
