import { Component } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {
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
}
