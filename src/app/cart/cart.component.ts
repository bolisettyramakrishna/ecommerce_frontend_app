import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    console.log('CartComponent loaded');
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }

  updateQuantity(id: number, quantity: number) {
    this.cartService.updateItemQuantity(id, quantity);
    this.loadCartDetails(); // Refresh cart items and total price after removing
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
