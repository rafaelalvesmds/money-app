import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistryFormComponent } from './registry-form.component';
import { RegistryTypeFormModule } from '../registry-type-form/registry-type-form.module';

@NgModule({
  declarations: [
    RegistryFormComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    RegistryTypeFormModule
  ],
  exports: [
    RegistryFormComponent
  ]
})
export class RegistryFormModule { }
