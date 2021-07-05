import { Injectable } from '@angular/core';
import { Comment } from '../Models/comment.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const apiUrl = 'http://localhost:5000/api/v1/comments/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
 
  constructor(private http:HttpClient) {
   }

  getComments(postId):Observable<Comment[]>{
    return this.http.get<Comment[]>(`${apiUrl}${postId}`).pipe(
      tap(_=>{}),
      catchError(this.handleError('comments', []))
      );
  }

  createComment(postId,comment):Observable<Comment>{
    return this.http.post<any>(`${apiUrl}${postId}`,comment).pipe(tap(_=>{},catchError(this.handleError("create comment",[]))));
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
