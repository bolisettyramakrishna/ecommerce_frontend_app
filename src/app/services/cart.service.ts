import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];

  private totalQuantitySubject = new BehaviorSubject<number>(0);
  private totalPriceSubject = new BehaviorSubject<number>(0);

  totalQuantity$ = this.totalQuantitySubject.asObservable();
  totalPrice$ = this.totalPriceSubject.asObservable();

  constructor() {
    this.loadCartItems();
  }

  //method to add product to cart
  addToCart(product: CartItem) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    this.updateCartTotals();
    this.savedCartToStorage(); // Update totals after adding the item
  }
  private savedCartToStorage(){
    localStorage.setItem('cartItems',JSON.stringify(this.cartItems));
  }
  private loadCartItems() {
    const cartData = localStorage.getItem('cartItems');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
      this.updateCartTotals(); // Update totals after loading cart
    }
  }

  //method to get all items in the cart
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  ///Updating number of items in the cart
  updateItemQuantity(id: number, quantity: number) {
    const item = this.cartItems.find((cartItem) => cartItem.id === id);
    if (item) {
      item.quantity = quantity;
    }
    this.updateCartTotals(); // Update totals after quantity change
  }

  // Remove item from cart
  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
    this.updateCartTotals();
  }

  // Get total price of items in the cart
  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );
  }

  // Get total quantity of items in the cart
  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // Update the total price and quantity BehaviorSubjects
  private updateCartTotals() {
    const totalQuantity = this.getTotalQuantity();
    const totalPrice = this.getTotalPrice();

    console.log('Updating totalQuantity:', totalQuantity);  // Debug log
    console.log('Updating totalPrice:', totalPrice);        // Debug log

    this.totalQuantitySubject.next(totalQuantity);
    this.totalPriceSubject.next(totalPrice);
  }

  clearCart() {
    console.log('Clearing cart...');
    this.cartItems = [];
    this.updateCartTotals(); // Update totals after clearing the cart
  }

}
