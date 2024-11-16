import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  var token = localStorage.getItem('token');
  console.log('token = ' + token)
  if (token) {
    request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
  }

  return next(request).pipe(catchError(error => {
    return throwError(error);
  }));
};
