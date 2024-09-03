import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslatePrimeng } from './core/helpers/translate.primeng';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TranslatePrimeng]
})
export class AppComponent {
  title = 'Moneyapp';
  constructor(private translatePrimeng: TranslatePrimeng, private primengConfig: PrimeNGConfig) {
    this.translatePrimeng.config(this.primengConfig);
  }
}
