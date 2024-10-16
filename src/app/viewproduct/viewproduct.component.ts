import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { Productresponse } from '../common/productresponse';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-viewproduct',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './viewproduct.component.html',
  styleUrl: './viewproduct.component.css',
})
export class ViewproductComponent implements OnInit, OnChanges {
  orderId: number = 0;
  oId: string = '';
  products: Productresponse[] = [];

  constructor(
    private route: ActivatedRoute,
    public dashBoardService: DashboardService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // this.route.params.subscribe((params) => {
    //   this.orderId = params['orderId'];
    //   this.fetchProducts(this.orderId);
    // });
  }

  ngOnInit(): void {
    this.oId = this.route.snapshot.paramMap.get('orderId')!;
    this.fetchProducts(this.oId);

    // this.route.params.subscribe((params) => {
    //   this.orderId = params['orderId'];
    //   this.fetchProducts(this.orderId);
    // });
  }

  fetchProducts(oId: string) {
    const id = Number(oId);

    this.dashBoardService
      .fetchProductData(id)
      .subscribe((data: Productresponse[]) => {
        this.products = data;
      });
  }
  // fetchProducts(id: number) {
  //   console.log('fetchProd');
  //   console.log(id);
  //   this.dashBoardService
  //     .fetchProductData(id)
  //     .subscribe((data: Productresponse[]) => {
  //       this.products = data;
  //     });
  // }

  backDashboard() {
    this.router.navigateByUrl('/filterOrders');
  }
}
