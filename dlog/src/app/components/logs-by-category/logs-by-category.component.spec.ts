import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsByCategoryComponent } from './logs-by-category.component';

describe('LogsByCategoryComponent', () => {
  let component: LogsByCategoryComponent;
  let fixture: ComponentFixture<LogsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogsByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
