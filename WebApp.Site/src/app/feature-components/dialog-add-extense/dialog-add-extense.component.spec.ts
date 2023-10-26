import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddExtenseComponent } from './dialog-add-extense.component';

describe('DialogAddExtenseComponent', () => {
  let component: DialogAddExtenseComponent;
  let fixture: ComponentFixture<DialogAddExtenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddExtenseComponent]
    });
    fixture = TestBed.createComponent(DialogAddExtenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
