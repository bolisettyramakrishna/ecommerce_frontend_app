import { Component, OnInit } from '@angular/core';
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

  cartQuantity = 0;
  cartTotal = 0;

  constructor(private cartService: CartService) {
    this.updateCartDetails();
  }

  ngOnInit(): void {
    this.cartService.totalQuantity$.subscribe(
      (quantity) => {
        console.log('Updated cart quantity:', quantity); // Debug log
        (this.cartQuantity = quantity)}
    );

    this.cartService.totalPrice$.subscribe(
      (totalPrice) => {
        console.log('Updated cart total price:', totalPrice); // Debug log
        this.cartTotal = totalPrice;
      }
    );
  }

  updateCartDetails() {
    this.cartQuantity = this.cartService.getTotalQuantity();
    this.cartTotal = this.cartService.getTotalPrice();
  }

  
}
