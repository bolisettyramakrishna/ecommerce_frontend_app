import { Component, OnInit } from '@angular/core';
import { OrderdetailsService } from '../services/orderdetails.service';
import { ActivatedRoute } from '@angular/router';
import { Orderdetails } from '../common/orderdetails';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderdetails',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent implements OnInit{
  constructor(private ordersService:OrderdetailsService,private route:ActivatedRoute){}

  orderdtls:Orderdetails[]=[];

  ngOnInit(){
    console.log("Fetching Order details based on email");
    const email: string = this.route.snapshot.paramMap.get('email')!;
    this.fetchOrderDetails(email);
  }
  fetchOrderDetails(email: string) {
    this.ordersService.findOrdersByEmail(email).subscribe((data:Orderdetails[])=>{
      console.log(data);
      this.orderdtls=data;
    });
  }
}
