import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Advertisement} from "../../models/Advertisement";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  private baseUrl = environment.apiUrl + '/advertisement'

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

  getAll(): Observable<Advertisement[]> {
    {
      return this.http.get<Advertisement[]>(this.baseUrl).pipe(
        catchError(this.handleError)
      );
    }
  }

  getAdvertisement(id: any): Observable<Advertisement> {
    return this.http.get<Advertisement>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  postAdvertisement(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteAdvertisement(id: any): Observable<any> {
    console.log('delete servide')
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
