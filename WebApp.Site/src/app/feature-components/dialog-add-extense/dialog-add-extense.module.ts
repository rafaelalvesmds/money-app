import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAddExtenseComponent } from './dialog-add-extense.component';
import { PrimeNgModule } from 'src/app/shared/modules/primeng.module';



@NgModule({
  declarations: [
    DialogAddExtenseComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    DialogAddExtenseComponent,
  ]
})
export class DialogAddExtenseModule { }
