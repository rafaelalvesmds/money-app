import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistryFormComponent } from './registry-form.component';


describe('RegistryFormComponent', () => {
  let component: RegistryFormComponent;
  let fixture: ComponentFixture<RegistryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistryFormComponent]
    });
    fixture = TestBed.createComponent(RegistryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
