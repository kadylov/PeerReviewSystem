import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerPageComponent } from './reviewer-page.component';

describe('ReviewerPageComponent', () => {
  let component: ReviewerPageComponent;
  let fixture: ComponentFixture<ReviewerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
