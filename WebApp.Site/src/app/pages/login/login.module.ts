import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PrimeNgModule
  ]
})

export class LoginModule { }
