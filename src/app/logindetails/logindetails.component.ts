import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../common/login';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-logindetails',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './logindetails.component.html',
  styleUrl: './logindetails.component.css',
})
export class LogindetailsComponent {
  errormsg: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  loginFormGroup!: FormGroup;

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      login: this.formBuilder.group({
        email: [''],
        password: [''],
      }),
    });
  }

  onSubmit() {
    let adminEmail = 'admin@gmail.com';
    let adminPassword = 'admin123';

    console.log('Handling submit form value');
    console.log(this.loginFormGroup.get('login')?.value);

    let login = new Login();
    login = this.loginFormGroup.get('login')?.value;

    console.log('Value is' + login);
    if (adminEmail == login.email && adminPassword == login.password) {
     
      this.router.navigateByUrl('/admindashboard');
    } else {
      this.loginService.checkIfValid(login).subscribe((data) => {
        const login = data;
        console.log(login);
        if (login.email != null) {
         
          this.router.navigateByUrl('/order-details');
        } else {
          this.errormsg = 'Invalid credentials';
          console.log(this.errormsg);
        }
      });
    }
  }
}
