import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = environment.apiUrl + '/forum/comments'

  constructor(private http: HttpClient) { }

  postComment(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data).pipe(
      // catchError(this.handleError)
    );
  }

  deleteComment(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      // catchError(this.handleError)
    );
  }
}
