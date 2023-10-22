import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';
import { AnalyticsValuesModule } from 'src/app/feature-components/analytics-values/analytics-values.module';


@NgModule({
  declarations: [
    ManagementComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    PrimeNgModule,
    AnalyticsValuesModule
  ]
})
export class ManagementModule { }
