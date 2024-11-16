import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Discussion} from "../../models/Discussion";

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  private baseUrl = environment.apiUrl + '/forum/discussions'

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Ошибка на стороне клиента:', error.error);
    } else {
      console.error(
        `Ошибка сервера с кодом ${error.status}, ошибка: `, error.error);
    }
    return throwError(() => new Error('Что-то пошло не так, попробуйте еще раз позже.'));
  }

  getAll(advertisementId: any): Observable<Discussion[]> {
    return this.http.get<Discussion[]>(`${this.baseUrl}/advertisement/${advertisementId}`).pipe(
      catchError(this.handleError)
    );
  }
  getDiscussion(discussionId: any): Observable<Discussion> {
    return this.http.get<Discussion>(`${this.baseUrl}/${discussionId}`).pipe(
      catchError(this.handleError)
    );
  }

  postDiscussion(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  deleteDiscussion(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
