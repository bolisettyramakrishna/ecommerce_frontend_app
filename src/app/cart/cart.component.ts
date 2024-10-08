import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'], // Fixed the typo from styleUrl to styleUrls
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    console.log('CartComponent loaded');
    this.loadCartDetails();
  }

  updateQuantity(id: number, quantity: number) {
    this.cartService.updateItemQuantity(id, quantity);
    this.loadCartDetails(); // Refresh cart items and total price after quantity update
  }

  removeItem(item: any) {
    this.cartService.removeFromCart(item.id);
    this.loadCartDetails(); // Refresh cart items and total price after removing
  }

  loadCartDetails() {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}
