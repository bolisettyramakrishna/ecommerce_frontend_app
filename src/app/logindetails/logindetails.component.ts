import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule } from '@angular/forms';
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
  isAdmin: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) { }

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
    console.log('Handling submit form value');
    console.log(this.loginFormGroup.get('login')?.value);

    let login = new Login();
    login = this.loginFormGroup.get('login')?.value;

    console.log('Value is' + login);

    this.isAdmin = this.loginService.checkIfAdmin(login);
    if (this.isAdmin) {
      this.router.navigateByUrl('/admindashboard');
    }
    if(!this.isAdmin){
      this.loginService.checkIfValid(login).subscribe((data) => {
        const login = data;
        console.log(login);
        if (login.email != null) {
          this.loginService.session = { username: 'user' };
          this.router.navigateByUrl(`/order-details/${login.email}`);
        } else {
          this.errormsg = 'Invalid credentials';
          console.log(this.errormsg);
        }
      });
    }
    this.loginFormGroup.reset();
  }

}
