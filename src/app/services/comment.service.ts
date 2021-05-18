import { Injectable } from '@angular/core';
import { Comment } from '../Models/comment.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


const apiUrl = 'http://localhost:5000/api/v1/posts';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}

  getComments(postId: any): Observable<Comment> {
    const url = `${apiUrl}/${postId}/comments`;
    return this.http.get<Comment>(url).pipe(tap(_ => console.log(`fetched comments by id=${postId}`)),
      catchError(this.handleError<Comment>(`getPost id=${postId}`))
    );
  }

  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
