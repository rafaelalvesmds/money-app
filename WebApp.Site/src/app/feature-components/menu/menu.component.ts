import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  displayTerminal!: boolean;

  displayFinder!: boolean;

  dockItems!: MenuItem[];

  menubarItems!: any[];

  responsiveOptions!: any[];

  nodes!: any[];

  user!: UserModel;
  currentUser!: UserModel;

  screenWidth!: number;
  screenHeigth!: number;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.setResponsitityScreen();

    this.getUser();

    this.userService.currentUser.subscribe((user: any) => {
      this.currentUser = user;
    });

    // this.dockItems = [
    //   {
    //     label: 'Dashboard',
    //     // tooltip: 'Dashboard',
    //     tooltipPosition: 'bottom',
    //     icon: 'https://primefaces.org/cdn/primeng/images/dock/finder.svg',
    //     routerLink: '/dashboard'
    //   },
    //   {
    //     label: 'Management',
    //     // tooltip: 'Management',
    //     tooltipPosition: 'bottom',
    //     icon: 'https://primefaces.org/cdn/primeng/images/dock/terminal.svg',
    //     routerLink: '/management'
    //   },
    //   {
    //     label: 'Exit',
    //     // tooltip: 'Exit',
    //     tooltipPosition: 'bottom',
    //     icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png',
    //     command: () => {
    //       this.logout()
    //     }
    //   }
    // ];
  }

  getUser() {
    let userId = localStorage.getItem('userId');

    if (userId) {
      this.authService.getUserById(userId).subscribe({
        next: (user: UserModel) => {
          this.user = user;
        },
        complete: () => {
          console.log(this.user, 'user');
        },
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.setResponsitityScreen();
  }

  setResponsitityScreen() {
    const card = document.getElementById('card-container'); // Substitua 'your-card-id' pelo ID real do seu elemento p-card
    if (card) {
      if (this.screenWidth > 960) {
        card.style.width = `${this.screenWidth * 0.85}px`;
      } else {
        card.style.width = `${this.screenWidth * 0.95}px`;
      }
    }
  }

  logout() {
    this.router.navigate(['/login']);
    // this.userService.clearCurrentUser();
    localStorage.removeItem('token');
  }
}
