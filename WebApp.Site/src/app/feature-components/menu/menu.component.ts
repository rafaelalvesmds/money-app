import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  displayTerminal!: boolean;

  displayFinder!: boolean;

  dockItems!: MenuItem[];

  menubarItems!: any[];

  responsiveOptions!: any[];

  nodes!: any[];

  currentUser!: UserModel;

  constructor(private messageService: MessageService, private router: Router, private userService: UserService) { }

  ngOnInit() {

    this.userService.currentUser.subscribe((user: any) => {
      this.currentUser = user;
    });

    this.dockItems = [
      {
        label: 'Dashboard',
        tooltip: 'Dashboard',
        tooltipPosition: 'bottom',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg',
        routerLink: '/dashboard'
      },
      {
        label: 'Management',
        tooltip: 'Management',
        tooltipPosition: 'bottom',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/terminal.svg',
        routerLink: '/management'
      },
      {
        label: 'Exit',
        tooltip: 'Trash',
        tooltipPosition: 'bottom',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png',
        command: () => {
          this.logout()
        }
      }
    ];
  }

  logout() {
    this.router.navigate(['/login'])
    this.userService.clearCurrentUser();
    localStorage.removeItem('token');
  }


}
