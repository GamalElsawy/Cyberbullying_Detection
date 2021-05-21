import { Injectable } from '@angular/core';
import { Post } from '../Models/post.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const apiUrl = 'http://localhost:5000/api/v1/posts';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts:Post[]=[];
  constructor(private http:HttpClient) { }

  getPosts():Observable<Post[]>{

    
    return this.http.get<Post[]>(apiUrl).pipe(
    tap( _ => console.log('posts transfered done')),
    catchError(this.handleError('posts', []))
    );
    
  }

  createPost(data: any): Observable<any> {
    return this.http.post<any>(apiUrl, data)
      .pipe(
        tap(_ => console.log('create post')),
        catchError(this.handleError('create post', []))
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