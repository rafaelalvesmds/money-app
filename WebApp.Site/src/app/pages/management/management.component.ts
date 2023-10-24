import { Component } from '@angular/core';
import { ExpenseModel } from 'src/app/core/models/expense.model';
import { ExpenseService } from 'src/app/core/service/expense.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {

  constructor(private expenseService: ExpenseService) { }

  expenseSelected!: ExpenseModel;

  cards = [
    {
      title: 'Receita',
      value: '$2,100',
      icon: 'pi pi-map-marker',
      bgColor: 'bg-green-100',
      changeValue: '+%52',
      changeText: 'Nov/2023',
      colorChangeValue: 'red'
    },
    {
      title: 'Gasto',
      value: '$2,100',
      icon: 'pi pi-map-marker',
      bgColor: 'bg-red-100',
      changeValue: '+%52',
      changeText: 'Nov/2023',
      colorChangeValue: 'green'
    },
    {
      title: 'Saldo',
      value: '$2,100',
      icon: 'pi pi-map-marker',
      bgColor: 'bg-orange-100',
      changeValue: '+%52',
      changeText: 'Nov/2023',
      colorChangeValue: 'red'
    },
    {
      title: 'Top 1',
      value: '$1,100',
      icon: 'pi pi-map-marker',
      bgColor: 'bg-orange-400',
      changeValue: 'Cartão de crédito',
      colorChangeValue: 'orange'
    },
  ];

  expenses = [];

  columns: any[] = [
    { field: 'name', header: 'Name' },
    { field: 'price', header: 'Price' },
    { field: 'expenseType', header: 'Category', useTag: true },
  ]


  ngOnInit() {
    this.expenseService.getExpenses("string@string.com").subscribe({
      next: (res: any) => {
        console.log(res.expenses)
        this.expenses = res.expenses;
      }
    })
  }

  receiveExpenseSelected(e: any) {
    this.expenseSelected = e;

    this.deleteExpense();
  }

  deleteExpense() {
    this.expenseService.deleteExpense(this.expenseSelected.id).subscribe({
      next: (res: any) => {
        console.log(res, 'dele res')
      }
    })
  }
}
