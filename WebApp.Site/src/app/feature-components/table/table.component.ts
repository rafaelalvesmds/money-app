import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RegistryCategoryEnum } from 'src/app/core/enums/registryCategory.enum';
import { ActionsModel } from 'src/app/core/models/actions.model';

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

  @Input() registryCategory!: number;

  registryCategoryEnum = RegistryCategoryEnum

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

  addButton(typeAdd: number) {

    this.addValue.emit(typeAdd);
  }

  setTextColor(registry: any, column: any): string {
    console.log(registry, 'kik')
    if (registry.category == 1 && column.field == 'price') {
      return 'font-semibold text-red-300'
    }

    if (registry.category == 2 && column.field == 'price') {
      return 'font-semibold text-green-300'
    }

    return ''
  }
}
