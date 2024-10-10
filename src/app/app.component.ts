import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { SearchComponent } from './search/search.component';
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegisterbtnComponent } from './registerbtn/registerbtn.component';

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
    RegisterbtnComponent
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
      (quantity) => (this.cartQuantity = quantity)
    );

    this.cartService.totalPrice$.subscribe(
      (totalPrice) => (this.cartTotal = totalPrice)
    );
  }

  updateCartDetails() {
    this.cartQuantity = this.cartService.getTotalQuantity();
    this.cartTotal = this.cartService.getTotalPrice();
  }
}
