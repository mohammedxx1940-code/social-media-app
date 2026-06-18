import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AsidePageComponent } from "../components/aside-page/aside-page.component";
import { AlertComponent } from "../components/alert/alert.component";
import { PATTERNS } from '../../../../shared/util/pattern';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, AsidePageComponent, RouterLink, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  loginForm : FormGroup;
  authS = inject(AuthService);
  loading = false;
  errorMsg = '';
  routerS = inject(Router);
  constructor(){
    this.loginForm = this.fb.group({
      email : ['' , [Validators.required , Validators.email]] , 
      password : [null , [Validators.required , Validators.pattern(PATTERNS.password)]]
    });
  }
  get emailController(){
    return this.loginForm.get('email');
  }
  get passwordController(){
    return this.loginForm.get('password');
  }
  login(){
    this.loading = true;
    this.errorMsg = '';
    this.authS.login(this.loginForm.value).subscribe({
      next : (r) => {
        this.loading = false;
          if(r?.data?.token){
            this.routerS.navigate(['/main/feed']);
            localStorage.setItem('token' , r.data.token);
          }
      } ,
      error : (e) => {
        this.loading = false;
        this.errorMsg = e.error.message;
      }
    })
  }
}
//mohammedxx1000@gmail.com