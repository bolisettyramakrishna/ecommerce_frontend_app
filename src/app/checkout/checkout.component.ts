import { Component, OnInit, NgZone } from '@angular/core';
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
import { PaymentVerificationPayload } from '../common/payment-verification-payload';

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
  imports: [FormsModule, CommonModule],
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
  customer: Customer = new Customer('', '', '');
  address: Address = new Address('', '', '', '', '', '');

  constructor(private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router,
    private ngZone: NgZone) { }

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
    let orderItems: OrderItem[] = this.cartItems.map(item => new OrderItem(item.imageUrl, item.unitPrice, item.quantity, item.prodname));

    // Prepare purchase object
    let purchase = new Purchase();
    purchase.customer = this.customer;
    purchase.address = this.address;
    purchase.order = order;
    purchase.orderItems = orderItems;

    // Prepare PaymentVerificationPayload object
    let paymentVerificationPayload = new PaymentVerificationPayload('','','');
    

    //Call the checkout service to place the order
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {

        const razorpayOrderId = response.razorpayOrderId;
        const amount = this.totalPrice;
        this.orderTrackingId = response.orderTrackingNumber;
        this.initiateRazorpayPayment(razorpayOrderId, amount);
      },
      error: err => {
        console.error('Error placing order', err);
      }
    });
    
  }

  // Method to initiate Razorpay payment
  initiateRazorpayPayment(razorpayOrderId: string, amount: number) {
    console.log('Entering initiateRazorpayPayment method');
    const options = {
      key: 'rzp_test_ANOvYSLNOU4ump', // Enter the Key ID generated from the Razorpay Dashboard
      amount: amount * 100, // Amount is in currency subunits (i.e., paise for INR)
      currency: 'INR',
      name: 'Ashok-IT',
      description: 'Ecommerce-Order',
      order_id: razorpayOrderId, // Use the Razorpay order ID returned from the backend
      prefill: {
        name: this.customer.name,
        email: this.customer.email,
        contact: this.customer.phno,
      },
      handler: (response: any) => {
        if (response && response.razorpay_payment_id && response.razorpay_signature) {
          console.log('Payment response in handler :', response);
          // this.ngZone.run(() => {
          //   this.paymentSuccess = true;
          //   console.log('Payment Status inside handler:', this.paymentSuccess);
          // });

          // Verify payment with backend
          const paymentPayload = {
            razorpayOrderId: razorpayOrderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          };
          this.verifyPayment(paymentPayload);

        } else {
          this.ngZone.run(() => {
            this.paymentSuccess = false;
            console.error('Payment failed or no payment ID received.');
          });

        }
      },

    };

    const razorpay = new Razorpay(options);
      razorpay.open();
      console.log('Exiting initiateRazorpayPayment method');
  }
  verifyPayment(paymentPayload: PaymentVerificationPayload) {
    console.log('Entering verifyPayment');
    this.checkoutService.verifyPayment(paymentPayload).subscribe({
      next: (response) => {
        console.log('verifyPayment response  :', response);
        this.ngZone.run(() => {
          this.paymentSuccess = true;
          console.log('Payment verified successfully in verifyPayment');
        });
      },
      error: (err) => {
        this.ngZone.run(() => {
          this.paymentSuccess = false;
          console.error('Payment verification failed:', err);
        });
      }
    });
  }
  
  continueShopping() {
    this.paymentSuccess = false;
    this.cartService.clearCart();
    this.router.navigateByUrl('/shop');
  
    // Navigate after a small delay
    // setTimeout(() => {
    //   this.router.navigateByUrl('/shop');
    // }, 200);
  }

  

}
