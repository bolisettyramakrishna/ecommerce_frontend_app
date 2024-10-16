// import { Component, OnChanges, OnInit } from '@angular/core';
// import { ProductCategoryService } from '../services/product-category.service';
// import { ProductCategory } from '../common/product-category';
// import { RouterModule, ActivatedRoute } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { UserRoleService } from '../services/user-role.service';

// @Component({
//   selector: 'app-product-category',
//   standalone: true,
//   imports: [RouterModule, CommonModule, FormsModule],
//   templateUrl: './product-category.component.html',
//   styleUrls: ['./product-category.component.css'],
// })
// export class ProductCategoryComponent implements OnInit, OnChanges {
//   productCategories: ProductCategory[] = [];
//   userRole: string = 'normalUser';

//   constructor(
//     private productCategoryService: ProductCategoryService,
//     private route: ActivatedRoute,
//     private userRoleService: UserRoleService  
//   ) {}

//   ngOnChanges(): void {
//     this.userRole = sessionStorage.getItem('role') || '';
//     console.log('App - Onchange');
//     console.log(this.userRole);
//   }

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(() => {
//       this.listProductCategories();
//       this.updateUserRole(); 
//       this.userRole = sessionStorage.getItem('role') || 'normalUser';
//       console.log("Role : "+ this.userRole);
//     });

//     this.userRoleService.userRole$.subscribe((role) => {
//       this.userRole = role;
//       console.log("User Role Updated: ", this.userRole);
//     });
//   }

//   updateUserRole() {
//     this.userRole = sessionStorage.getItem('role') || 'normalUser'; 
//     console.log("Role: " + this.userRole);
//   }

//   listProductCategories() {
//     this.productCategoryService.getProductCategories().subscribe((data) => {
//       this.productCategories = data;
//     });
    
//   }
// }

//updated Code 

import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategory } from '../common/product-category';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoleService } from '../services/user-role.service';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit {
  productCategories: ProductCategory[] = [];
  userRole: string = 'normalUser'; // Default userRole to normalUser

  constructor(
    private productCategoryService: ProductCategoryService,
    private route: ActivatedRoute,
    private userRoleService: UserRoleService // Inject UserRoleService
  ) {}

  ngOnInit(): void {
    // Update the user role when the component initializes
    this.updateUserRole();

    // Subscribe to UserRoleService to listen for any changes in user role
    this.userRoleService.userRole$.subscribe((role) => {
      this.userRole = role;
      console.log("User Role Updated from UserRoleService: ", this.userRole);
    });

    // Fetch product categories when route parameters change
    this.route.paramMap.subscribe(() => {
      this.listProductCategories();
    });
  }

  updateUserRole() {
    // Fetch the role from sessionStorage or default to 'normalUser'
    this.userRole = sessionStorage.getItem('role') || 'normalUser';
    console.log("Updated user role: " + this.userRole);
  }

  listProductCategories() {
    // Fetch product categories
    this.productCategoryService.getProductCategories().subscribe((data) => {
      this.productCategories = data;
    });
  }
}
