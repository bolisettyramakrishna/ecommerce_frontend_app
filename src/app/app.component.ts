import { Component,OnInit  } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { SearchComponent } from "./search/search.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ProductListComponent, CommonModule, ProductCategoryComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {

  title = 'ecommerce_frontend';

}
