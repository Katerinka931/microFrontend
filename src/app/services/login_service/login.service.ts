import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.apiUrl + '/auth'

  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Ошибка на стороне клиента:', error.error);
    } else {
      console.error(
        `Ошибка сервера с кодом ${error.status}, ошибка: `, error.error);
    }
    return throwError(() => new Error('Что-то пошло не так, попробуйте еще раз позже.'));
  }

  login(data: any): Observable<any> {
    let d = {'username': data['login_username'], 'password': data['login_password']}
    return this.http.post(`${this.baseUrl}/login`, d).pipe(
      // catchError(this.handleError)
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data).pipe(
      // catchError(this.handleError)
    );
  }

  getAuthToken(): string | null {
    console.log('authentication')
    console.log(localStorage.getItem('Authentication'))
    return localStorage.getItem('Authentication');
  }
}
