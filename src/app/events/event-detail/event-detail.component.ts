import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Event } from '../event.model';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit {
  event: Event;
  isLoading = false;
  private title: string;
  availableSeats: any[];
  time: string;
  seats: string;

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('title')) {
        this.title = paramMap.get('title');
        this.isLoading = true;
        this.eventsService.getEventDetail(this.title).subscribe(eventData => {
          this.isLoading = false;
          this.event = {
            Title: eventData[0].Title,
            Time: eventData[0].Time,
            Image: eventData[0].Image,
            Location: eventData[0].Location,
            AvailableSeats: eventData[0].AvailableSeats
          };
          this.availableSeats = eventData[0].AvailableSeats;
          this.time = new Date(this.event.Time).toLocaleString();
          this.seats = (this.event.AvailableSeats.length > 0 ? this.event.AvailableSeats.length + ' Left': 'Not available');
        });
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
}
