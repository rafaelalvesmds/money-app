import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSpentComponent } from './table-spent.component';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';



@NgModule({
  declarations: [
    TableSpentComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    TableSpentComponent
  ]
})
export class TableSpentModule { }
