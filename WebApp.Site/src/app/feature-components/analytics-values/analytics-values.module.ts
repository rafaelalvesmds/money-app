import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsValuesComponent } from './analytics-values.component';



@NgModule({
  declarations: [
    AnalyticsValuesComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AnalyticsValuesComponent,
  ]
})
export class AnalyticsValuesModule { }
