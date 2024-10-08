import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableComponent } from './table.component';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    TableComponent
  ],
  providers: [DatePipe]
})
export class TableSpentModule { }
