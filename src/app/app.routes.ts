import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LogindetailsComponent } from './logindetails/logindetails.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'products', component: ProductListComponent },
  {path:'login-details',component:LogindetailsComponent},
  {path:'order-details/:email',component:OrderdetailsComponent},
  { path: 'product-category', component: ProductCategoryComponent },
  {path:'admindashboard',component:AdmindashboardComponent},
  {path:'forgotpwd',component:ForgotpasswordComponent},
  {path:'resetpwd/:email',component:ResetpasswordComponent},
  {path:'register',component:RegisterComponent},
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }
  
];
