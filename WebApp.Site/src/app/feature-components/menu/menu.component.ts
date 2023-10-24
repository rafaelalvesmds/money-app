import { Component, HostListener, OnInit } from '@angular/core';
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

  screenWidth!: number;

  constructor(private messageService: MessageService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.updateCardWidth();

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
        tooltip: 'Exit',
        tooltipPosition: 'bottom',
        icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png',
        command: () => {
          this.logout()
        }
      }
    ];


  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.updateCardWidth();
  }

  updateCardWidth() {
    const card = document.getElementById('card-container'); // Substitua 'your-card-id' pelo ID real do seu elemento p-card
    if (card) {
      if(this.screenWidth > 960) {
        card.style.width = `${this.screenWidth * 0.8}px`;
        card.style.marginTop = `${this.screenWidth * 0.1}px`
      } else {
        card.style.width = `${this.screenWidth * 0.90}px`;
        card.style.marginTop = `${this.screenWidth * 0.05}px`
      }
    }
  }

  logout() {
    this.router.navigate(['/login'])
    this.userService.clearCurrentUser();
    localStorage.removeItem('token');
  }

}
