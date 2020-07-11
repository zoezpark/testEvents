import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Event } from './event.model';
import { EventsService } from './events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  isLoading = false;
  private eventsSub: Subscription;

  constructor(public eventsService: EventsService) { }

  ngOnInit() {
    this.isLoading = false;
    this.events = [];
    this.eventsService.getEvents('');
    this.eventsSub = this.eventsService
      .getEventsUpdateListener()
      .subscribe((eventData: { events: Event[]; maxEvents: number}) => {
        this.isLoading = true;
        this.events = eventData.events;
      });
  }

  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }

  onGetDetail($event) {
    console.log('onGetDetail');
    this.eventsService.getEventDetail($event);
  }
}
