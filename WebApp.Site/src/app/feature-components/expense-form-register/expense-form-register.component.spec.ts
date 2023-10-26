import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseFormRegisterComponent } from './expense-form-register.component';

describe('ExpenseFormRegisterComponent', () => {
  let component: ExpenseFormRegisterComponent;
  let fixture: ComponentFixture<ExpenseFormRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseFormRegisterComponent]
    });
    fixture = TestBed.createComponent(ExpenseFormRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
