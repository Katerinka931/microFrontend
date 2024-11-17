import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {TokenStorageService} from "../services/token_storage_service/token-storage.service";
import {inject} from "@angular/core";


export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  let tokenStorage = inject(TokenStorageService);
  const token = tokenStorage.getToken();
  if (token) {
    request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
  }

  return next(request).pipe(catchError(error => {
    return throwError(error);
  }));
};
