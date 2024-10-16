import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Orderhistory } from '../common/orderhistory';
import { OrderResponse } from '../common/order-response';
import { DashboardService } from '../services/dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewproductComponent } from '../viewproduct/viewproduct.component';
import { Productresponse } from '../common/productresponse';

@Component({
  selector: 'app-admin-filter-search',
  standalone: true,
  imports: [FormsModule, CommonModule, ViewproductComponent],
  templateUrl: './admin-filter-search.component.html',
  styleUrl: './admin-filter-search.component.css',
})
export class AdminFilterSearchComponent implements OnInit, OnChanges {
  orderHistory: Orderhistory = new Orderhistory();
  orders: OrderResponse[] = [];
  sendOrderId: number = 0;
  products: Productresponse[] = [];
  isModalOpen = false;

  constructor(public dashBoardService: DashboardService) {}

  ngOnInit(): void {
    this.filterOrders();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isModalOpen = true;
  }

  filterOrders() {
    this.dashBoardService
      .searchForOrders(this.orderHistory)
      .subscribe((data: OrderResponse[]) => {
        this.orders = data;
      });
    console.log(this.orders);
  }

  openModal(orderId: number) {
    this.isModalOpen = true;
    this.sendOrderId = orderId;
    this.dashBoardService
      .fetchProductData(orderId)
      .subscribe((data: Productresponse[]) => {
        this.products = data;
      });
    console.log(this.products);
  }
}
