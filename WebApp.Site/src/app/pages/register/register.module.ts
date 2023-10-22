import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PrimeNgModule,
  ],
})
export class RegisterModule { }
