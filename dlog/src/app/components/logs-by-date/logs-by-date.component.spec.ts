import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsByDateComponent } from './logs-by-date.component';

describe('LogsByDateComponent', () => {
  let component: LogsByDateComponent;
  let fixture: ComponentFixture<LogsByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
