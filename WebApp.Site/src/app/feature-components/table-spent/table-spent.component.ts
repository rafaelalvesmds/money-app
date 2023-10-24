import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExpenseModel } from 'src/app/core/models/expense.model';

@Component({
  selector: 'app-table-spent',
  templateUrl: './table-spent.component.html',
  styleUrls: ['./table-spent.component.css']
})
export class TableSpentComponent {

  @Input() columns!: { field: string; header: string; useTag?: boolean }[];
  @Input() expenses!: any[];

  @Output() expenseSelected = new EventEmitter<ExpenseModel>()

  onIconClick(expense: any) {
    // Execute ação aqui
    this.expenseSelected.emit(expense)
    console.log(expense, 'oi')
  }
}
