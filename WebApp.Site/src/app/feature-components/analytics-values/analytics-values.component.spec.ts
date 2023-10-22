import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsValuesComponent } from './analytics-values.component';

describe('AnalyticsValuesComponent', () => {
  let component: AnalyticsValuesComponent;
  let fixture: ComponentFixture<AnalyticsValuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnalyticsValuesComponent]
    });
    fixture = TestBed.createComponent(AnalyticsValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
