import { Component, OnChanges, OnInit } from '@angular/core';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategory } from '../common/product-category';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit, OnChanges {
  productCategories: ProductCategory[] = [];
  userRole: String = '';

  constructor(
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnChanges(): void {
    this.userRole = sessionStorage.getItem('role') || '';
    console.log('App - Onchange');
    console.log(this.userRole);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProductCategories();
      this.userRole = sessionStorage.getItem('role') || '';
      console.log('productCategory');
      console.log(this.userRole);
    });
  }

  listProductCategories() {
    this.productCategoryService.getProductCategories().subscribe((data) => {
      this.productCategories = data;
    });
    //this.productCategories = [];
  }
}
