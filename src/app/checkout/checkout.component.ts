import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { Customer } from '../common/customer';
import { Address } from '../common/address';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';
import { Purchase } from '../common/purchase';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var Razorpay: any; // Declare Razorpay
export interface CartItem {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
  imageUrl: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalQuantity: number = 0;
  totalPrice: number = 0;
  cartItems: OrderItem[] = [];

   
   orderTrackingId: string = '';  // Initialize orderTrackingId
   paymentSuccess: boolean = false;  // Initialize paymentSuccess flag
  
  
  
  // Customer and Address objects
  customer: Customer = new Customer('','', '');
  address: Address = new Address('', '', '', '', '', '');

  constructor(private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) { }

  ngOnInit(): void {
    // Fetch cart items and totals
    //this.cartItems = this.cartService.getCartItems();
    const cartItems: CartItem[] = this.cartService.getCartItems();

    // Map CartItem objects to OrderItem objects
    this.cartItems = cartItems.map(item => new OrderItem(
    item.imageUrl,
    item.unitPrice,
    item.quantity,
    item.name
  ));

    this.totalPrice = this.cartService.getTotalPrice();
    this.totalQuantity = this.cartService.getTotalQuantity();
  }

  // Submit method
  onSubmit() {
    // Create order from cart details
    let order = new Order(this.totalQuantity, this.totalPrice);
    
    // Get the order items from the cart
    let orderItems: OrderItem[] = this.cartItems.map(item => new OrderItem(item.imageUrl, item.unitPrice, item.quantity,  item.prodname));

    // Prepare purchase object
    let purchase = new Purchase();
    purchase.customer = this.customer;
    purchase.address = this.address;
    purchase.order = order;
    purchase.orderItems = orderItems;

    //Call the checkout service to place the order
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        console.log(response);
        const razorpayOrderId = response.razorpayOrderId; 
        const amount = this.totalPrice; 
        this.orderTrackingId = response.orderTrackingNumber;
       // alert(`Order placed successfully with order Tracking ID : ${this.orderTrackingId}` );
        this.initiateRazorpayPayment(razorpayOrderId, amount);
      },
      error: err => {
        console.error('Error placing order', err);
      }
    });
    //alert(`Order placed successfully!`);
  }

  // Method to initiate Razorpay payment
  initiateRazorpayPayment(razorpayOrderId: string, amount: number) {
    console.log('Entering initiateRazorpayPayment method');
    const options = {
      key: 'rzp_test_tuikA9DbNmuQ6Y', // Enter the Key ID generated from the Razorpay Dashboard
      amount: amount * 100, // Amount is in currency subunits (i.e., paise for INR)
      currency: 'INR',
      name: 'Ashok-IT',
      description: 'Ecommerce-Order',
      order_id: razorpayOrderId, // Use the Razorpay order ID returned from the backend
      handler: (response: any) => {
        
       // alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
     
      },
      prefill: {
        name: this.customer.name,
        email: this.customer.email,
        contact: this.customer.phno,
      }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
    console.log('Exiting initiateRazorpayPayment method');
    this.paymentSuccess = true;
  }

  continueShopping() {
    // Reset state or navigate to another page, like cart or home
    this.paymentSuccess = false;  // Reset the flag if you want to reuse the form
    this.router.navigateByUrl('/shop');  // Navigate to the shop or cart page
  }
  //Method to verify Payment

  // onPaymentSuccess(response: any) {
  //   console.log('Entering onPaymentSuccess method');
  //   // Prepare the payload for verification 
  //   const paymentPayload = {
  //     razorpay_order_id: response.razorpay_order_id,
  //     razorpay_payment_id: response.razorpay_payment_id,
  //     razorpay_signature: response.razorpay_signature
  //   };
  //   console.log('Printing Payload')
  //   console.log(response.razorpay_order_id,response.razorpay_payment_id,response.razorpay_signature);
  
  //   // Call the backend API for payment verification
  //   this.checkoutService.verifyPayment(paymentPayload).subscribe({
  //     next: backendResponse => {
  //       alert('Payment successful and verified!');
  //       // Navigate to success page or display order summary
  //       //this.router.navigateByUrl("/order-success");
  //     },
  //     error: err => {
  //       console.error('Payment verification failed', err);
  //     }
  //   });

  //   console.log('Exiting onPaymentSuccess method');
  // }
}