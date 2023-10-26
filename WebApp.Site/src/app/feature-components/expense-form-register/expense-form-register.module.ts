import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseFormRegisterComponent } from './expense-form-register.component';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ExpenseFormRegisterComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ExpenseFormRegisterComponent
  ]
})
export class ExpenseFormRegisterModule { }
