import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamemodeUiComponent } from './gamemode-ui.component';

describe('GamemodeUiComponent', () => {
  let component: GamemodeUiComponent;
  let fixture: ComponentFixture<GamemodeUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamemodeUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamemodeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
