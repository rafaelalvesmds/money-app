import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';



@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    SpinnerComponent
  ]
})
export class SpinnerModule { }
