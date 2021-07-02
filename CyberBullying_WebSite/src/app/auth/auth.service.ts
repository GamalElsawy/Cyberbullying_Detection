import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const apiUrl = 'http://localhost:5000/api/v1/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();
  loggedInStatus = false;
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'login',data).pipe(tap(_ => {
          this.isLoggedIn.emit(true);
          this.loggedInStatus = true;
        }),
        catchError(this.handleError('login', []))
      );
  }

  logout(): Observable<any> {
    return this.http.get<any>(apiUrl + 'logout')
      .pipe(
        tap(_ => {
          this.isLoggedIn.emit(false);
          this.loggedInStatus = false;
        }),
        catchError(this.handleError('logout', []))
      );
  }

  getMe(){
    let headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization','Bearer '+localStorage.getItem('token'))
    .set('Accept', 'application/json');
    let options = { headers: headers };
    return this.http.get(apiUrl+'me',options);
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'register', data)
      .pipe(
        tap(_ => console.log('login')),
        catchError(this.handleError('login', []))
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