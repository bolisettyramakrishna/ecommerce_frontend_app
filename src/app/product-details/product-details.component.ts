import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { Product } from '../common/product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    // get id param value and call service method
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }

  // Add To Cart method
  addToCart() {
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      unitPrice: this.product.unitPrice,
      imageUrl: this.product.imageUrl,
      quantity: 1,
    });

    // Optional: You can log to check if the method is called
    console.log(`${this.product.name} has been added to the cart.`);
  }
}
