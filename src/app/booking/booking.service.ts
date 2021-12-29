import { Injectable } from '@angular/core';
import { Booking } from '../interfaces';
import { Observable, of, from } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class BookingService {
    private serverUrl = 'http://localhost:4000/api'; // URL to web api
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    constructor(private http: HttpClient) { }

    /** POST: add a new booking to the server */
    addBooking(booking: Booking, venueId: number, userId: number): Observable<any> {
        return this.http
            .post<Booking>(`${this.serverUrl}/booking/`, { booking, venueId, userId }, this.httpOptions)
            .pipe(
                tap((res : any) => {
                    console.log(`addBooking user response from server`, res);
                    // if (res.status == 201) {
                    //     return { error: false, newBooking: res.newBooking }
                    // }
                }),
                catchError(this.handleError<Booking>('addBooking'))
            );
    }


    /** GET booking by id. Will 404 if id not found */
    getBooking(id: number): Observable<Booking> {
        const url = `${this.serverUrl}/${id}`;
        return this.http.get<Booking>(url).pipe(
            tap((_) => console.log(`fetched venue id=${id}`)),
            catchError(this.handleError<Booking>(`getBooking id=${id}`))
        );
    }

    /** GET bookings from the server */
    getBookings(): Observable<Booking[]> {
        return this.http.get<Booking[]>(`${this.serverUrl}/booking/`).pipe(
            tap((_) => console.log('fetched bookings', _)),
            catchError(this.handleError<Booking[]>('getVenues', []))
        );
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
