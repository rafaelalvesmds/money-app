import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionsModel } from 'src/app/core/models/actions.model';
import { ExpenseModel } from 'src/app/core/models/expense.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input() columns!: { field: string; header: string; width: string; alignment: string; pipe?: 'money' | 'date'; useTag?: boolean }[];
  @Input() values!: any[];
  @Input() actions!: ActionsModel[]
  @Input() title!: string;

  @Output() valueSelected = new EventEmitter<any>()
  @Output() addValue = new EventEmitter<any>()

  onRowClick(value: any) {
    // Execute ação aqui
    this.valueSelected.emit(value)
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
    this.addValue.emit();
  }
}
