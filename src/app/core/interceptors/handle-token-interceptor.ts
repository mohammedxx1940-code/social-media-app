import { HttpInterceptorFn } from '@angular/common/http';

export const handleTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    setHeaders : {
      authorization : 'Bearer ' + (localStorage ? localStorage.getItem('token') : "")
    }
  });
  return next(newReq);
};