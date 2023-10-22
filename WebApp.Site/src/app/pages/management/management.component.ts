import { Component } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {
  cards = [
    {
      title: 'Orders',
      value: '152',
      icon: 'pi pi-shopping-cart',
      bgColor: 'bg-blue-100',
      changeValue: '24',
      changeText: 'since last visit',
    },
    {
      title: 'Revenue',
      value: '$2,100',
      icon: 'pi pi-map-marker',
      bgColor: 'bg-orange-100',
      changeValue: '%52+',
      changeText: 'since last week',
    },
    {
      title: 'Customers',
      value: '28,441',
      icon: 'pi pi-inbox',
      bgColor: 'bg-cyan-100',
      changeValue: '520',
      changeText: 'newly registered',
    },
    {
      title: 'Comments',
      value: '152 Unread',
      icon: 'pi pi-comment',
      bgColor: 'bg-purple-100',
      changeValue: '85',
      changeText: 'responded',
    },
  ];
}
