import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarBookPage } from './calendar-book.page';

describe('CalendarBookPage', () => {
  let component: CalendarBookPage;
  let fixture: ComponentFixture<CalendarBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarBookPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
