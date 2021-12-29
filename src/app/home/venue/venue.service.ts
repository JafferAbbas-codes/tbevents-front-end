import { Injectable } from '@angular/core';
import { User, Venue } from '../../interfaces';
import { Observable, of, from } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VenueService {
  private serverUrl = 'http://localhost:4000/api'; // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  /* GET venues whose name contains search term */
  searchVenuesByArea(city: string, area: string, min_rent: number, max_rent: number, min_cap: number, max_cap: number): Observable<Venue[]> {
    // if (!term.trim()) {
    //   // if not search term, return empty venue array.
    //   return of([]);
    // }
    return this.http.get<Venue[]>(`${this.serverUrl}/venue/search/area?country=Pakistan&city=${city}&area=${area}&min_rent=${min_rent}&max_rent=${max_rent}&min_cap=${min_cap}&max_cap=${max_cap}`).pipe(
      tap((x) =>
        x.length
          ? console.log(`found venues matching`)
          : console.log(`no venues matching`)
      ),
      catchError(this.handleError<Venue[]>('searchVenues', []))
    );
  }
  searchVenuesByCurrentLocation(lat: number, long: number, radius: number, min_rent: number, max_rent: number, min_cap: number, max_cap: number): Observable<Venue[]> {
    // if (!term.trim()) {
    //   // if not search term, return empty venue array.
    //   return of([]);
    // }
    return this.http.get<Venue[]>(`${this.serverUrl}/venue/search/nearby?lat=${lat}&long=${long}&radius=${radius}&min_rent=${min_rent}&max_rent=${max_rent}&min_cap=${min_cap}&max_cap=${max_cap}`).pipe(
      tap((x) =>
        x.length
          ? console.log(`found venues matching`)
          : console.log(`no venues matching`)
      ),
      catchError(this.handleError<Venue[]>('searchVenues', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getVenue(id: number): Observable<Venue> {
    const url = `${this.serverUrl}/venue/${id}`;
    return this.http.get<Venue>(url).pipe(
      tap((_) => console.log(`fetched venue id=${id}`)),
      catchError(this.handleError<Venue>(`getVenue id=${id}`))
    );
  }

  /** GET heroes from the server */
  getVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.serverUrl}/venue/`).pipe(
      tap((_) => console.log('fetched venues')),
      catchError(this.handleError<Venue[]>('getVenues', []))
    );
  }

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
