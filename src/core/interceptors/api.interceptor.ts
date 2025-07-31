import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const ApiInterceptor: HttpInterceptorFn = (req, next) => {

  const baseUrl = 'http://localhost:8000/api';

  const apiReq = req.clone({
    url: `${baseUrl}/${req.url}`,
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  return next(apiReq).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(() => error);
    })
  );
};
