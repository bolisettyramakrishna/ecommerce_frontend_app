import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Login } from '../common/login';
import { LoginService } from '../services/login.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-logindetails',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './logindetails.component.html',
  styleUrl: './logindetails.component.css'
})
export class LogindetailsComponent {

  constructor(private formBuilder:FormBuilder,private loginService:LoginService,private router:Router){}
  
  loginFormGroup!: FormGroup;

  adminemail:string="admin@gmail.com";
  adminpassword:string="admin1234";

  ngOnInit(): void {
    this.loginFormGroup=this.formBuilder.group({
      login:this.formBuilder.group({
        email:[''],
        password:['']
      })
    });
  }

  onSubmit(){
    console.log("Handling submit form value");
    console.log(this.loginFormGroup.get('login')?.value);

    let login=new Login();
    login=this.loginFormGroup.get('login')?.value;

    console.log("Value is"+login);

    if(this.adminemail==login.email && this.adminpassword==login.password){
      this.router.navigateByUrl("/admin-dashboard");
    }else{
      this.loginService.checkIfValid(login).subscribe(data=>{
        const login=data;
        console.log(login);
        if(login.email!=null){
          this.router.navigateByUrl("/order-details");
        }else{
          alert(`Invalid credentials`);
        }
      });
    }
    
  }
}
