import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingWorkComponent } from './incoming-work.component';

describe('IncomingWorkComponent', () => {
  let component: IncomingWorkComponent;
  let fixture: ComponentFixture<IncomingWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
