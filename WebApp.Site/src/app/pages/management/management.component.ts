import { Component } from '@angular/core';
import { error } from 'console';
import { MessageService } from 'primeng/api';
import { ExpenseTypeEnum } from 'src/app/core/enums/expenseType.enum';
import { ActionsModel } from 'src/app/core/models/actions.model';
import { ExpenseModel } from 'src/app/core/models/expense.model';
import { ExpenseService } from 'src/app/core/service/expense.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {

  constructor(private expenseService: ExpenseService, private messageService: MessageService,) { }

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
    { field: 'description', header: 'Description', width: '60%' },
    { field: 'expenseType', header: 'Category', useTag: true, width: '20%', alignment: 'center' },
    { field: 'price', header: 'Price', width: '20%', alignment: 'right', pipe: 'money' },
  ]

  actions: ActionsModel[] = [
    {
      icon: 'pi pi-pencil',
      command: () => this.editExpense()
    },
    {
      icon: 'pi pi-trash',
      command: () => this.deleteExpense()
    }
  ]

  visible: boolean = false;

  typeAction!: "register" | "edit";

  ngOnInit() {
    this.getExpenses()
  }

  receiveExpenseSelected(e: any) {
    this.expenseSelected = e;
  }

  getExpenses() {
    this.expenseService.getExpenses("gau@gau").subscribe({
      next: (res: any) => {
        console.log(res.expenses)
        // this.expenses = res.expenses;

        this.expenses = res.expenses.map((item: ExpenseModel) => this.createData(item));
      },
      error: (error: any) => {
        // console.log(error.error.notifications, 'error notifications')
      }
    })
  }

  updateExpense(e: ExpenseModel) {
    this.visible = false;

    this.expenseService.updateExpense(e).subscribe({
      next: (res: any) => {
        this.getExpenses();
      }
    })
  }

  editExpense() {
    console.log(this.expenseSelected, 'kd')

    this.typeAction = 'edit'
    this.visible = true
  }

  deleteExpense() {

    this.expenseService.deleteExpense(this.expenseSelected.id).subscribe({
      next: (res: any) => {
        if (res.success)
          this.getExpenses()
      }
    })
  }

  addExpense() {
    this.visible = true
  }

  createData(item: ExpenseModel) : ExpenseModel{
    return {
      id: item.id,
      email: item.email,
      description: item.description,
      expenseType: item.expenseType,
      price: item.price,
      expenseDate: item.expenseDate,
      includedDate: item.includedDate,
    };
  }

  registerExpense(e: any) {

    this.expenseService.createExpense(e.expense).subscribe({
      next: (res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.notifications[0].message });
        this.visible = e.visible;
        this.getExpenses();
      },
    })
  }
}

