import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRushComponent } from './time-rush.component';

describe('TimeRushComponent', () => {
  let component: TimeRushComponent;
  let fixture: ComponentFixture<TimeRushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeRushComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeRushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
