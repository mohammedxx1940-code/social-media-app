import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  routerS = inject(Router)
  login(data : any) : Observable<any>{
    return this.http.post('https://route-posts.routemisr.com/users/signin' , data)
  }
  register(data : any) : Observable<any>{
    return this.http.post('https://route-posts.routemisr.com/users/signup' , data)
  }
  logOut(){
    localStorage.removeItem('token');
    this.routerS.navigate(['/auth/login']);
  } 
}