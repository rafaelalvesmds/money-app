import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserModel } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];
  currentUser!: UserModel;

  constructor(private router: Router, private userService: UserService) {
    this.items = [
      { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: '/dashboard' },
      { label: 'Gerenciar Gastos', icon: 'pi pi-fw pi-chart-bar', routerLink: '/gerenciar-gastos' },
      { label: 'Sair', icon: 'pi pi-fw pi-sign-out', command: () => this.logout() },
    ];
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user: any) => {
      this.currentUser = user;
    });
    console.log(this.currentUser, 'current user')
  }

  logout() {
    this.router.navigate(['/login'])
    this.userService.clearCurrentUser();
    localStorage.removeItem('token');
  }

}
