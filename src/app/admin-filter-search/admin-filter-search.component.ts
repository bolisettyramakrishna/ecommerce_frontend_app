import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Orderhistory } from '../common/orderhistory';
import { OrderResponse } from '../common/order-response';
import { DashboardService } from '../services/dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewproductComponent } from '../viewproduct/viewproduct.component';
import { Productresponse } from '../common/productresponse';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-filter-search',
  standalone: true,
  imports: [FormsModule, CommonModule, ViewproductComponent, RouterModule],
  templateUrl: './admin-filter-search.component.html',
  styleUrl: './admin-filter-search.component.css',
})
export class AdminFilterSearchComponent implements OnInit {
  orderHistory: Orderhistory = new Orderhistory();
  orders: OrderResponse[] = [];
  sendOrderId: number = 0;

  constructor(
    public dashBoardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filterOrders();
  }

  filterOrders() {
    this.dashBoardService
      .searchForOrders(this.orderHistory)
      .subscribe((data: OrderResponse[]) => {
        this.orders = data;
      });
    console.log(this.orders);
  }

  getProduct(orderId: number) {
    this.router.navigateByUrl(`/viewProduct/${orderId}`);
  }
}
