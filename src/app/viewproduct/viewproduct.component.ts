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

@Component({
  selector: 'app-viewproduct',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './viewproduct.component.html',
  styleUrl: './viewproduct.component.css',
})
export class ViewproductComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Input() orderId: any;
  @Input() productData: Productresponse[] = [];

  constructor(public dashboardService: DashboardService) {}
  isModalOpen = false;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isModalOpen = true;
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
