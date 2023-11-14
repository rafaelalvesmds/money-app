import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseTypeEnum } from 'src/app/core/enums/expenseType.enum';
import { IncomeTypeEnum } from 'src/app/core/enums/incomeType.enum';
import { RegistryCategoryEnum } from 'src/app/core/enums/registryCategory.enum';
import { ActionsModel } from 'src/app/core/models/actions.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() columns!: { field: string; header: string; width: string; alignment: string; pipe?: 'money' | 'date' | 'enum'; useTag?: boolean, enum: any }[];
  @Input() values!: any[];
  @Input() actions!: ActionsModel[]

  @Output() valueSelected = new EventEmitter<any>()
  @Output() addValue = new EventEmitter<any>()
  @Output() dateSelected = new EventEmitter<any>()

  date: Date[] = [new Date(new Date().getFullYear(), new Date().getMonth(), 1)];

  @Input() registryCategory!: number;

  registryCategoryEnum = RegistryCategoryEnum

  calendarForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.calendarForm = this.fb.group({
      date: [new Date(), [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.emitDate()

    this.calendarForm.valueChanges.subscribe({
      next: (res: any) => {
        console.log(this.calendarForm.value, 'teste')
        console.log(res);
        this.emitDate()
      }
    })
  }

  onRowClick(value: any) {

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

  manipulateValue(registry: any, column: any) {

    let value = registry[column.field]

    if (column.pipe) {
      switch (column.pipe) {
        case 'money':
          return this.formatValue(value);
        case 'date':
          return new Date(value).toLocaleDateString('pt-BR')
        case 'enum':
          if (registry.category == 1)
            return ExpenseTypeEnum[value]
          else return IncomeTypeEnum[value]
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

  addButton(typeAdd: number) {

    this.addValue.emit(typeAdd);
  }

  setTextColor(registry: any, column: any): string {
    if (registry.category == 1 && column.field == 'price') {
      return 'font-semibold text-red-300'
    }

    if (registry.category == 2 && column.field == 'price') {
      return 'font-semibold text-green-300'
    }

    return ''
  }

  emitDate() {
    this.date = this.calendarForm.value.date;
    this.dateSelected.emit(this.date)
  }
}
