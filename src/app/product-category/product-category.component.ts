import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategory } from '../common/product-category';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  productCategories: ProductCategory[] = []; 

  constructor(private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProductCategories();
    })
  }

  listProductCategories() {
    this.productCategoryService.getProductCategories().subscribe(data => {
      this.productCategories = data; 
    });
  }
}
