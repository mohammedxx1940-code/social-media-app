import { Component, inject } from '@angular/core';
import {FormGroup , FormControl, Validators, ReactiveFormsModule, ValidationErrors, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AsidePageComponent } from '../components/aside-page/aside-page.component';
import { misMatchValidation } from '../../../../shared/util/misMatchValidation';
import { PATTERNS } from '../../../../shared/util/pattern';
import { AlertComponent } from "../components/alert/alert.component";
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, AsidePageComponent, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  registerForm : FormGroup;
  constructor(){
    this.registerForm = this.fb.group({
      name : ['' , [Validators.required , Validators.minLength(5)]] ,
      username : [null, Validators.pattern(/^[a-zA-Z0-9_]{4,}$/)] ,
      email : ['' , [Validators.required , Validators.email]] ,
      gender : ['male' , [Validators.required]] ,
      dateOfBirth : ['' , [Validators.required]] ,
      password : ['' , [Validators.required , 
        Validators.pattern(PATTERNS.password)]] , 
      rePassword : ['' , [Validators.required]]
    } ,
    {
      validators : [misMatchValidation('password' , 'rePassword' , 'rePassword') , ]
    } 
  );
  }
  get nameController(){
    return this.registerForm.get('name');
  }
  get emailController(){
    return this.registerForm.get('email');
  }
  get genderController(){
    return this.registerForm.get('gender');
  }
  get dateOfBirthController(){
    return this.registerForm.get('dateOfBirth');
  }
  get passwordController(){
    return this.registerForm.get('password');
  }
  get rePasswordController(){
    return this.registerForm.get('rePassword');
  }
  authS = inject(AuthService);
  routerS = inject(Router);
  errorMsg = '';
  isLoading = false;
  registerNow(){
    console.log(this.registerForm?.valid);
    if(this.registerForm.valid){
      this.isLoading = true;
      this.authS.register(this.registerForm.value).subscribe({
        next : (r)=>{
          console.log(r);
          this.isLoading = false;
          if(r?.data?.token){
            this.routerS.navigate(['/main/feed']);
            localStorage.setItem('token' , r.data.token);
          }
        } , 
        error : (e)=>{
          console.log(e);
          this.errorMsg = e?.error?.errors;
          this.isLoading = false;
        }
      })
    }
  }
}