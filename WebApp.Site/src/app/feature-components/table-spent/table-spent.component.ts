import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-spent',
  templateUrl: './table-spent.component.html',
  styleUrls: ['./table-spent.component.css']
})
export class TableSpentComponent {

  @Input() columns!: { field: string; header: string; useTag?: boolean }[];
  @Input() expenses!: any[];

}
