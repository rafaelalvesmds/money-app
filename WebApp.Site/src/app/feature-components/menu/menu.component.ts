import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  items!: MenuItem[];

  constructor(private router: Router) {

    const user = localStorage.getItem('user');
    console.log(user, 'user')

    this.items = [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/dashboard' },
      { label: 'Gerenciar Gastos', icon: 'pi pi-fw pi-chart-bar', routerLink: '/gerenciar-gastos' },
      { label: 'Sair', icon: 'pi pi-fw pi-sign-out', command: () => this.logout() },
    ];
  }

  logout() {
    this.router.navigate(['/login'])
    localStorage.removeItem('token');
  }

}
