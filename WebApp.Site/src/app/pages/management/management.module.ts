import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';
import { AnalyticsValuesModule } from 'src/app/feature-components/analytics-values/analytics-values.module';
import { TableSpentModule } from 'src/app/feature-components/table-spent/table-spent.module';
import { ExpenseFormRegisterModule } from 'src/app/feature-components/expense-form-register/expense-form-register.module';


@NgModule({
  declarations: [
    ManagementComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    PrimeNgModule,
    AnalyticsValuesModule,
    TableSpentModule,
    ExpenseFormRegisterModule
  ]
})
export class ManagementModule { }
