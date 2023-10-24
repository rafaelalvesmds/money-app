import { Component } from '@angular/core';
import { ExpenseService } from 'src/app/core/service/expense.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {

  constructor(private expenseService: ExpenseService) { }

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

  products = [
    { name: 'Product 1', price: 50, category: 'Category A', inventoryStatus: 'In Stock' },
    { name: 'Product 2', price: 30, category: 'Category B', inventoryStatus: 'Out of Stock' },
    { name: 'Product 3', price: 75, category: 'Category A', inventoryStatus: 'In Stock' },
    { name: 'Product 4', price: 60, category: 'Category C', inventoryStatus: 'Low Stock' },
    { name: 'Product 5', price: 45, category: 'Category B', inventoryStatus: 'In Stock' },
  ];

  columns: any[] = [
    { field: 'name', header: 'Name', useTag: false },
    { field: 'price', header: 'Price', useTag: false },
    { field: 'category', header: 'Category', useTag: false },
    { field: 'inventoryStatus', header: 'Inventory Status', useTag: true }
  ]


  ngOnInit() {
    this.expenseService.getExpenses("string@string.com").subscribe({
      next: (res: any) => {
        console.log(res)
      }
    })
  }
}
