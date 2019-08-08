import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificatioListPage } from './notificatio-list.page';

describe('NotificatioListPage', () => {
  let component: NotificatioListPage;
  let fixture: ComponentFixture<NotificatioListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificatioListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificatioListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
