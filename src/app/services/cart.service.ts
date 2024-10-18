import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartKey = 'userCart';
  private totalQuantitySubject = new BehaviorSubject<number>(0);
  private totalPriceSubject = new BehaviorSubject<number>(0);

  totalQuantity$ = this.totalQuantitySubject.asObservable();
  totalPrice$ = this.totalPriceSubject.asObservable();

  constructor() {

    this.loadCart();  // Load cart on service initialization
    this.loadCartItems();

  }

  //method to add product to cart
  addToCart(product: CartItem) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
      this.saveCart();  
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
  saveCart() {
    // Store cart items in localStorage
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
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
      if (item.quantity === 0) {
        this.removeFromCart(id); // If quantity is 0, remove the item
      }
    }
    this.saveCart(); // Save changes to localStorage
    this.updateCartTotals(); // Update totals after quantity change
  }

  // Remove item from cart
  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
    this.saveCart(); // Save changes to localStorage
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

  loadCart() {
    // Load cart items from localStorage on app start
    const savedCart = localStorage.getItem(this.cartKey);
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.updateCartTotals();  // Recalculate totals based on loaded cart
    }
  }

  clearCart() {
    // Clear cart items and remove from localStorage
    console.log('Clearing cart...');
    this.cartItems = [];
    localStorage.removeItem(this.cartKey);
    this.updateCartTotals(); // Update totals after clearing the cart
  }

}
