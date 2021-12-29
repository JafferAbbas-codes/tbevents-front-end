import { Injectable } from '@angular/core';
import { User, Venue } from '../interfaces';
import { Observable, of, from } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serverUrl = 'http://localhost:4000/api'; // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  //   /** Log a HeroService message with the MessageService */
  //   private log(message: string) {
  //     this.messageService.add(`HeroService: ${message}`);
  //   }

  /** POST: add a new hero to the server */
  loginUser(user: User): Observable<User> {
    return from(
      this.http
        .post<User>(`${this.serverUrl}/auth/login`, user, this.httpOptions)
        .pipe(
          tap((user: User) => {
            console.log(`signIn user response from server`, user);
            if (user.token) {
              this.saveToken(user as User);
            }
          }),
          catchError(this.handleError<User>('Login'))
        )
    );
  }

  /** POST: add a new hero to the server */
  registerUser(user: User): Observable<any> {
    return this.http
      .post<User>(`${this.serverUrl}/auth/register`, user, this.httpOptions)
      .pipe(
        tap((user: User) => {
          console.log(`registerUser user response from server`, user);
          if (user.token) {
            this.saveToken(user);
          }
        }),
        catchError(this.handleError<User>('Register'))
      );
  }
  //   /* GET venues whose name contains search term */
  //   searchVenues(term: string): Observable<Venue[]> {
  //     if (!term.trim()) {
  //       // if not search term, return empty venue array.
  //       return of([]);
  //     }
  //     return this.http.get<Venue[]>(`${this.serverUrl}/venue/search`).pipe(
  //       tap((x) =>
  //         x.length
  //           ? console.log(`found venues matching "${term}"`)
  //           : console.log(`no venues matching "${term}"`)
  //       ),
  //       catchError(this.handleError<Venue[]>('searchVenues', []))
  //     );
  //   }

  //   /** GET hero by id. Will 404 if id not found */
  //   getVenue(id: number): Observable<Venue> {
  //     const url = `${this.serverUrl}/${id}`;
  //     return this.http.get<Venue>(url).pipe(
  //       tap((_) => console.log(`fetched venue id=${id}`)),
  //       catchError(this.handleError<Venue>(`getVenue id=${id}`))
  //     );
  //   }

  //   /** GET heroes from the server */
  //   getVenues(): Observable<Venue[]> {
  //     return this.http.get<Venue[]>(`${this.serverUrl}/venue/`).pipe(
  //       tap((_) => console.log('fetched venues')),
  //       catchError(this.handleError<Venue[]>('getVenues', []))
  //     );
  //   }

  saveToken(user: User) {
    localStorage.setItem('token', user.token ? user.token : '');
    localStorage.setItem('user', user ? JSON.stringify(user) : '');
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error.error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error?.error);
    };
  }
}
