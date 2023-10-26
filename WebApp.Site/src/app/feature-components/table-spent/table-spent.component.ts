import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionsModel } from 'src/app/core/models/actions.model';
import { ExpenseModel } from 'src/app/core/models/expense.model';

@Component({
  selector: 'app-table-spent',
  templateUrl: './table-spent.component.html',
  styleUrls: ['./table-spent.component.css']
})
export class TableSpentComponent {

  @Input() columns!: { field: string; header: string; width: string; alignment: string; pipe?: 'money' | 'date'; useTag?: boolean }[];
  @Input() expenses!: any[];
  @Input() actions!: ActionsModel[]

  @Output() expenseSelected = new EventEmitter<ExpenseModel>()
  @Output() addExpense = new EventEmitter<any>()

  onRowClick(expense: any) {
    // Execute ação aqui
    this.expenseSelected.emit(expense)
    console.log(expense, 'oi')
  }

  getAlignmentClass(column: any): string {
    if (column.alignment === 'center') {
      return 'text-center';
    } else if (column.alignment === 'right') {
      return 'text-right';
    } else {
      return '';
    }
  }

  manipulateValue(value: any, column: any) {
    if (column.pipe) {
      switch (column.pipe) {
        case 'money':
          return `${value},00`
      }
    } else return value
  }

  addButton() {
    this.addExpense.emit();
  }
}
