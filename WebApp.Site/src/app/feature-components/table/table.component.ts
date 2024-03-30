import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistryCategoryEnum } from 'src/app/core/enums/registryCategory.enum';
import { ActionsModel } from 'src/app/core/models/actions.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  @Input() columns!: { field: string; header: string; width: string; alignment: string; pipe?: 'money' | 'date' | 'enum'; useTag?: boolean, enum: any }[];
  @Input() values!: any[];
  @Input() actions!: ActionsModel[]
  @Input() emptyTableMessage!: string;
  @Input() registryTypes: { id: number; name: string; category: number; color: string; }[] = []

  @Output() valueSelected = new EventEmitter<any>()
  @Output() addValue = new EventEmitter<any>()

  @Input() registryCategory!: number;

  registryCategoryEnum = RegistryCategoryEnum

  onRowClick(value: any) {

    this.valueSelected.emit(value)
  }

  getAlignmentClass(column: any): string {
    if (column.alignment === 'center') return 'text-center';
    else if (column.alignment === 'right') return 'text-right';
    else return '';
  }

  manipulateValue(registry: any, column: any) {

    let value = registry[column.field]

    if (column.pipe) {
      switch (column.pipe) {
        case 'money':
          return this.formatValue(value);
        case 'date':
          return new Date(value).toLocaleDateString('pt-BR')
        case 'registryType':
          return this.registryTypes.find(x => x.id == value)
      }
    } else return value
  }

  formatValue(valor: number): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return formatter.format(valor);
  }

  addButton(categoryAdd: number) {
    this.addValue.emit(categoryAdd);
  }

  setTextColor(registry: any, column: any): string {
    if (registry.category == 1 && column.field == 'price') return 'font-semibold text-red-300'
    if (registry.category == 2 && column.field == 'price') return 'font-semibold text-green-300'

    return ''
  }

}
