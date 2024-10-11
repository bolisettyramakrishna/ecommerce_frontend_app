import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgotpwdService } from '../services/forgotpwd.service';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent implements OnInit{

  errormsg:string="";
  successmsg:string="";
  forgotpwdFormGroup!: FormGroup;

  constructor(private formBuilder:FormBuilder,private forgotpwd:ForgotpwdService){}

  ngOnInit(): void {
    this.forgotpwdFormGroup=this.formBuilder.group({
      forgot:this.formBuilder.group({
        email:['']
      })
    });
    console.log(this.forgotpwdFormGroup);
  }
  onSubmit() {
    console.log("Handling forgot pwd form value");
    console.log(this.forgotpwdFormGroup.get('forgot')?.get('email')?.value);

    const email=this.forgotpwdFormGroup.get('forgot')?.get('email')?.value;

    this.forgotpwd.sendMail(email).subscribe(
      response => {
        console.log(response);
        if(response){
          this.successmsg="Email sent successfully";
          this.errormsg="";
        }else{
          this.errormsg="Please enter valid email id";
          this.successmsg="";
        }
      },
      error => {
        this.successmsg="";
        this.errormsg="Some exception occured";
      }
    );

  }

}
