import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { Login } from '../common/login';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { UserRoleService } from '../services/user-role.service';

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
    private userRoleService: UserRoleService,  // Inject UserRoleService
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
    console.log('Handling submit form value');
    console.log(this.loginFormGroup.get('login')?.value);

    let login = new Login();
    login = this.loginFormGroup.get('login')?.value;

    console.log('Value is' + login);

    this.isAdmin = this.loginService.checkIfAdmin(login);
    if (this.isAdmin) {
      this.userRoleService.setUserRole('adminUser'); 
      this.router.navigateByUrl('/admindashboard');
      //sessionStorage.setItem('role', 'adminUser');
    } else {
      this.userRoleService.setUserRole('normalUser'); // Set 'normalUser' role
     // sessionStorage.setItem('role', 'normalUser');

      this.loginService.checkIfValid(login).subscribe((data) => {
        const login = data;     
        if (login.email != null) {
          this.loginService.session = { username: 'user' };
          this.router.navigateByUrl(`/order-details/${login.email}`);
        } else {
          this.errormsg = 'Invalid credentials';
        }
      });
    }
    this.loginFormGroup.reset();
  }
}
