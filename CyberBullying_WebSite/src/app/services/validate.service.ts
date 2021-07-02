import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const apiUrl = 'http://127.0.0.1:5001/validateString';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(private http:HttpClient) { }

  validate(text):Observable<any>{
    return this.http.post<any>(apiUrl,text).pipe(
     tap(_=>{
          console.log("validated string");
     }),
     catchError(this.handleError('predict', []))
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
