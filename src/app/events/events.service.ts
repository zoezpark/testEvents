import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Event } from './event.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private APIURL = 'http://localhost:11443';
  private events: Event[] = [];
  private eventsUpdated = new Subject<{ events: Event[]; maxEvents: number }>();

  constructor(private http: HttpClient, private router: Router) {}
  getHostURL(): string {
    return environment.API_URL;
  }
  getEvents(keyword: string) {
    // const queryParams = `?keyword=${keyword}`;
    // this.APIURL = this.getHostURL();
    const requestUrl = this.APIURL + '/api/events';
    const queryParams = (keyword.length > 0) ? `?keyword=${keyword}` : '';
    this.http
      .get<{ message: string; events: any; maxEvents: number }>(
        requestUrl + queryParams
      )
      .pipe(
        map(eventData => {
          return {
            events: eventData.events.map(event => {
              return {
                Title: event.Title,
                Time: event.Time,
                Location: event.Location
              };
            }),
            maxEvents: eventData.maxEvents
          };
        }),
        catchError(this.handleError('getEvents', {events: [], maxEvents: 0 }))
      )
      .subscribe(transformedEventData => {
        this.events = transformedEventData.events;
        this.eventsUpdated.next({
          events: [...this.events],
          maxEvents: transformedEventData.maxEvents
        });
      });
  }

  getEventsUpdateListener() {
    return this.eventsUpdated.asObservable();
  }
  getEventDetail(title: string) {
    return this.http.get<{
      Title: string;
      Time: Date;
      Image: any;
      Location: any;
      AvailableSeats: any[];
    }>(this.APIURL + '/api/events/' + title).pipe(
      catchError(this.handleError('getEventDetail', []))
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
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /*
  getEvents(keyword: string) {
    const queryParams = `?keyword=${keyword}`;
    this.http
      .get<{ message: string; events: any; maxEvents: number }>(
        this.APIURL + queryParams
      )
      .pipe(
        map(eventData => {
          return {
            events: eventData.events.map(event => {
              return {
                title: event.Title,
                time: event.Time,
                location: event.Location
              };
            }),
            maxEvents: eventData.maxEvents
          };
        })
      )
      .subscribe(transformedPostData => {
        this.events = transformedPostData.events;
        this.eventsUpdated.next({
          events: [...this.events],
          eventCount: transformedPostData.maxEvents
        });
      });
  }

  getEventsUpdateListener() {
    return this.eventsUpdated.asObservable();
  }
  */
}
