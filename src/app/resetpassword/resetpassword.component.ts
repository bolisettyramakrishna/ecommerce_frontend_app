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
        const responseString = JSON.stringify(response);
        alert(responseString);
      },
      error => {
        console.log("error");
        const responseString = JSON.stringify(error);
        alert('Error occured while sending mail'+error);
      }
    );
  }
  
}
