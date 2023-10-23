import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSpentComponent } from './table-spent.component';

describe('TableSpentComponent', () => {
  let component: TableSpentComponent;
  let fixture: ComponentFixture<TableSpentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSpentComponent]
    });
    fixture = TestBed.createComponent(TableSpentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
