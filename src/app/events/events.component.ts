import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Event } from './event.model';
import { EventsService } from './events.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  allEvents: Event[] = [];
  isLoading = false;
  form: FormGroup;
  searchLocation: string;
  private eventsSub: Subscription;

  selectedDate: string;

  constructor(public eventsService: EventsService) { }

  ngOnInit() {
    this.isLoading = false;
    this.form = new FormGroup({
      searchKeyword: new FormControl(null, {validators: [Validators.required]}),
      searchLocation: new FormControl(null, {validators: [Validators.required]})
    });
    this.events = [];
    this.eventsService.getEvents('');
    this.eventsSub = this.eventsService
      .getEventsUpdateListener()
      .subscribe((eventData: { events: Event[]; maxEvents: number}) => {
        this.isLoading = true;
        this.events = eventData.events;
        this.allEvents = this.events;
      });
  }

  ngOnDestroy() {
    this.eventsSub.unsubscribe();
  }

  onGetDetail($event) {
    console.log('onGetDetail');
    this.eventsService.getEventDetail($event);
  }
  onSearchByKeyword(searchKeyword) {
    console.log(searchKeyword);
    console.log('onSearchKeyword');
    this.eventsService.getEvents(searchKeyword);
    this.eventsSub = this.eventsService
      .getEventsUpdateListener()
      .subscribe((eventData: { events: Event[]; maxEvents: number}) => {
        this.isLoading = true;
        this.events = eventData.events;
        this.allEvents = this.events;
      });
  }
  onSearchByLocation(searchLocation) {
    console.log(searchLocation);
    console.log('onSearchLocation');
    if(searchLocation.length > 0 ) {
      // tslint:disable-next-line: max-line-length
      this.events = this.allEvents.filter(event => event.Location.City.toLowerCase().indexOf(searchLocation) !== -1 ||
        event.Location.State.toLowerCase().indexOf(searchLocation) !== -1 ||
        event.Location.Country.toLowerCase().indexOf(searchLocation) !== -1);
    } else {
      this.events = this.allEvents;
    }
  }

  /*addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = `${event.value}`;
  }*/
  onSearchByDate(dateEvent: MatDatepickerInputEvent<Date>) {
    const selectedDate = `${dateEvent.value}`;
    const test  = new Date( selectedDate ).toLocaleDateString().split(',')[0];

    console.log(test);
    console.log('onSearchByDate');
    if (test.length > 0 ) {
      // tslint:disable-next-line: max-line-length
      this.events = this.allEvents.filter(event => new Date(event.Time).toLocaleDateString().indexOf(test) !== -1);
    } else {
      this.events = this.allEvents;
    }
  }

  resetFilters() {
    this.ngOnInit();
  }
}
