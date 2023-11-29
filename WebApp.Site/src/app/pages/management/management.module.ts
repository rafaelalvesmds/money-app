import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';
import { AnalyticsValuesModule } from 'src/app/feature-components/analytics-values/analytics-values.module';
import { TableSpentModule } from 'src/app/feature-components/table/table.module';
import { RegistryFormModule } from 'src/app/feature-components/registry-form/registry-form.module';
import { SpinnerModule } from 'src/app/feature-components/spinner/spinner.module';


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
    RegistryFormModule,
    SpinnerModule
  ]
})
export class ManagementModule { }
