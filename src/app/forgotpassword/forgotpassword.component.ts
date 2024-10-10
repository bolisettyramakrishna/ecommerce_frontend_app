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
        alert('Email sent successfully'+response);
      },
      error => {
        alert('Error occured while sending mail'+error);
      }
    );

  }

}
