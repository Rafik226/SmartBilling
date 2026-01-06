import { HttpInterceptorFn } from '@angular/common/http';
import { retry, timer } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  let authReq = req;
  
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }


  return next(authReq).pipe(
    retry({
      count: 2,
      delay: (error, retryCount) => timer(retryCount * 500) 
    })
  );
};

