import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Resetpwd } from '../common/resetpwd';
import { ResetpwdService } from '../services/resetpwd.service';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent{

  constructor(private formBuilder: FormBuilder,private resetPwd:ResetpwdService){}

  resetFormGroup!: FormGroup;
  successmsg:string="";
  
  ngOnInit(){
    this.resetFormGroup = this.formBuilder.group({
      reset: this.formBuilder.group({
        email: [''],
        newPwd: [''],
        confirmNewPwd:['']
      })
    });
  }
  onSubmit() {
    console.log(this.resetFormGroup.get('reset')?.value);
    let resetpwd = new Resetpwd();
    resetpwd = this.resetFormGroup.get('reset')?.value;
    this.resetPwd.resetpassword(resetpwd).subscribe(
      response => {
        console.log(response);
        this.successmsg=response;
      },
      error => {
        console.log(error);
        this.successmsg=error;
      }
    );
  }
  
}
