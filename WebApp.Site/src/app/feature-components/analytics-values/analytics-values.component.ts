import { Component, input, Input, } from '@angular/core';
import { AnalyticsCard } from 'src/app/core/models/analytics-card.model';

@Component({
  selector: 'app-analytics-values',
  templateUrl: './analytics-values.component.html',
  styleUrls: ['./analytics-values.component.css']
})
export class AnalyticsValuesComponent {
  cards = input<AnalyticsCard[]>()
}
