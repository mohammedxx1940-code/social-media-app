import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';
import { catchError, throwError } from 'rxjs';

export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  const authService = inject(AuthService);
  return next(req).pipe(catchError((err) => {
    switch(err.status){
      case 401 :
        if(err.error.message == "invalid token"){
          authService.logOut();
        }
    }
    toastrService.error(err.error.message , "Error");
    return throwError(() => err);
  }));
};
