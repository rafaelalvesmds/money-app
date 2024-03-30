import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryTypeFormComponent } from './registry-type-form.component';

describe('RegistryTypeFormComponent', () => {
  let component: RegistryTypeFormComponent;
  let fixture: ComponentFixture<RegistryTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistryTypeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistryTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
