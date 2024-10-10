import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registerbtn',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './registerbtn.component.html',
  styleUrl: './registerbtn.component.css'
})
export class RegisterbtnComponent {

}
