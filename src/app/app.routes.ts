import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { LogindetailsComponent } from './logindetails/logindetails.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';

export const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  {path:'order-details/:keyword',component:OrderdetailsComponent},
  {path:'login',component:LoginComponent},
  {path:'login-details',component:LogindetailsComponent},
  { path: 'product-category', component: ProductCategoryComponent },
  {path:'admin-dashboard',component:AdmindashboardComponent},
  {path:'order-details',component:OrderdetailsComponent},
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
  
];
