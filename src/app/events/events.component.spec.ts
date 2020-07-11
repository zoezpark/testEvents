import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { EventsComponent } from './events.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventsService } from './events.service';
import { of, Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('EventsComponent', () => {
  let fixture: ComponentFixture<EventsComponent>;
  let mockEventsService;
  let EVENTS;

  beforeEach(async(() => {
    EVENTS = [
      {
        Title: 'Place 1',
        Time: '2018-07-22T02:30:00.000Z',
        Image: 'http://example.com/image.png',
        Location: {
          City: 'Brisbane',
          State: 'Queensland',
          Country: 'Australia',
        }
      },
      {
        Title: 'Place 2',
        Time: '2018-07-24T02:30:00.000Z',
        Image: 'http://example.com/image.png',
        Location: {
          City: 'Cairns',
          State: 'Queensland',
          Country: 'Australia',
        },
        AvailableSeats: [
          {
            id: 'W25'
          },
          {
            id: 'B29'
          }
        ]
      },
      {
        Title: 'Place 3',
        Time: '2018-07-24T02:30:00.000Z',
        Image: 'http://example.com/image.png',
        Location: {
          City: 'Gold Coast',
          State: 'Queensland',
          Country: 'Australia',
        },
        AvailableSeats: [
          {
            id: 'W25'
          },
          {
            id: 'B29'
          }
        ]
      }];
    mockEventsService = jasmine.createSpyObj(['getEvents', 'getEventDetail']);
    TestBed.configureTestingModule({
      declarations: [
        EventsComponent,
        EventDetailComponent
      ],
      imports: [
        HttpClientModule,
        AppRoutingModule
      ],
      providers: [
        { provider: EventsService, useValue: mockEventsService }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(EventsComponent);
  }));

  it('should render each events', () => {
    mockEventsService.getEvents.and.returnValue(of(EVENTS));
    fixture.detectChanges();
    expect(fixture.componentInstance.events.length).toBe(0);
    /*const eventsComponentDEs = fixture.debugElement.queryAll(By.directive(EventsComponent));
    expect(eventsComponentDEs.length).toEqual(0);*/
    // expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(0);
  });
  it('should show a loading image', () => {
    mockEventsService.getEvents.and.returnValue(of(EVENTS));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('img')).length).toBe(1);
    /*const eventsComponentDEs = fixture.debugElement.queryAll(By.directive(EventsComponent));
    expect(eventsComponentDEs.length).toEqual(0);*/
    // expect(fixture.debugElement.queryAll(By.css('table')).length).toBe(0);
  });

});
