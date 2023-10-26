import { Component } from '@angular/core';
import { error } from 'console';
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
    { field: 'name', header: 'Name', width: '50%' },
    { field: 'price', header: 'Price', width: '20%' },
    { field: 'expenseType', header: 'Category', useTag: true, width: '30%' },
  ]


  ngOnInit() {
    this.getExpenses()
  }

  receiveExpenseSelected(e: any) {
    this.expenseSelected = e;

    this.deleteExpense();
  }

  getExpenses() {
    this.expenseService.getExpenses("rafa@123").subscribe({
      next: (res: any) => {
        console.log(res.expenses)
        this.expenses = res.expenses;
      },
      error: (error: any) => {
        // console.log(error.error.notifications, 'error notifications')
      }
    })
  }

  deleteExpense() {
    this.expenseService.deleteExpense(this.expenseSelected.id).subscribe({
      next: (res: any) => {
        console.log(res, 'dele res')
        if (res.success)
          this.getExpenses()
      }
    })
  }
}
