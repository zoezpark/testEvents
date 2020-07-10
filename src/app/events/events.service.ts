import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
  getEvents() {
    // const queryParams = `?keyword=${keyword}`;
    // this.APIURL = this.getHostURL();
    const requestUrl = this.APIURL + '/api/events';
    this.http
      .get<{ message: string; events: any; maxEvents: number }>(
        requestUrl
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
        })
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
