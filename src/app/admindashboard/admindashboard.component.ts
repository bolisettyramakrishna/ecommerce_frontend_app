import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../common/dashboard';
import { DashboardService } from '../services/dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Orderhistory } from '../common/orderhistory';
import { OrderResponse } from '../common/order-response';

@Component({
  selector: 'app-admindashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admindashboard.component.html',
  styleUrl: './admindashboard.component.css',
})
export class AdmindashboardComponent implements OnInit {
  dashBoard: Dashboard;
  orderHistory: Orderhistory = new Orderhistory();
  orders: OrderResponse[] = [];

  constructor(public dashBoardService: DashboardService) {
    this.dashBoard = {
      customersCount: 0, // Provide default values or make sure the Dashboard interface is correctly defined
      ordersCount: 0,
      amountCollected: 0,
      productCount: 0,
    };
  }
  ngOnInit(): void {
    this.getDashBoardData();
    this.filterOrders();
  }

  getDashBoardData() {
    this.dashBoardService.getDashboardDetials().subscribe((data) => {
      this.dashBoard = data;
    });
    console.log(this.dashBoard);
  }

  filterOrders() {
    this.dashBoardService
      .searchForOrders(this.orderHistory)
      .subscribe((data: OrderResponse[]) => {
        this.orders = data;
      });
  }
}
