import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Register } from '../common/register';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  errormsg:string="";
  successmsg:string="";

  constructor(private formBuilder: FormBuilder,private register:RegisterService) { }

  registerFormGroup!: FormGroup;

  ngOnInit() {
    this.registerFormGroup = this.formBuilder.group({
      register: this.formBuilder.group({
        name: [''],
        password: [''],
        email: [''],
        phoneNo: ['']
      })
    });
  }

  onSubmit() {
    console.log(this.registerFormGroup.get('register')?.value);
    let register = new Register();
    register = this.registerFormGroup.get('register')?.value;
    this.register.register(register).subscribe(
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
