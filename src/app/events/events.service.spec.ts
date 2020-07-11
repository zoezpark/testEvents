import { TestBed, inject, async } from '@angular/core/testing';
import { EventsService } from './events.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
describe('EventsService', () => {
  let mockEventsService;
  let httpTestingController: HttpTestingController;
  let service: EventsService;

  beforeEach(async (() => {
    mockEventsService = jasmine.createSpyObj(['getEvents']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule,
        AppRoutingModule
      ],
      providers: [
        EventsService
      ]
    });
    // tslint:disable-next-line: deprecation
    httpTestingController = TestBed.get(HttpTestingController);
    // let msgSvc = TestBed.get(MessageService);
    // tslint:disable-next-line: deprecation
    service = TestBed.get(EventsService);
  }));

  describe('getEvents', () => {
    it('should call get with the correct URL', () => {
      service.getEvents('');
      // service.getHero(4).subscribe();
      const req = httpTestingController.expectOne('http://localhost:11443/api/events');
      req.flush({ Title: 'Place 1',
      Time: '2018-07-22T02:30:00.000Z',
      Image: 'http://example.com/image.png',
      Location: {
        City: 'Brisbane',
        State: 'Queensland',
        Country: 'Australia',
      }});
      httpTestingController.verify();
    });
  });
  describe('getEventDetail', () => {
    it('should call get with the correct URL', () => {
      service.getEventDetail('Place%201').subscribe();
      // service.getHero(4).subscribe();
      const req = httpTestingController.expectOne('http://localhost:11443/api/events/Place%201');
      req.flush({ Title: 'Place 2',
      Time: '2018-07-22T02:30:00.000Z',
      Image: 'http://example.com/image.png',
      Location: {
        City: 'Brisbane',
        State: 'Queensland',
        Country: 'Australia',
      }});
      httpTestingController.verify();
    });
    it('should return event detail when the title exists', () => {
      expect(service.getEventDetail('Place%201')).toBeTruthy();
    });
  });
});
