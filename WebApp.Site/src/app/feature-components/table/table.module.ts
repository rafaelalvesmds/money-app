import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';



@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableSpentModule { }
