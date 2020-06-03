/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopicViewAcceptanceRequestsComponent } from './topic-view-acceptance-requests.component';

describe('TopicViewAcceptanceRequestsComponent', () => {
  let component: TopicViewAcceptanceRequestsComponent;
  let fixture: ComponentFixture<TopicViewAcceptanceRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicViewAcceptanceRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicViewAcceptanceRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
