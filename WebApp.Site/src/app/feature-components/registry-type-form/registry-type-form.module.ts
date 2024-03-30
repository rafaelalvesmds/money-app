import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistryTypeFormComponent } from './registry-type-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';



@NgModule({
  declarations: [RegistryTypeFormComponent],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RegistryTypeFormComponent]
})
export class RegistryTypeFormModule { }
