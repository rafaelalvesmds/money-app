import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);

  user!: UserModel;

  screenWidth!: number;
  screenHeigth!: number;


  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.setResponsitityScreen();

    this.getUser();
  }

  getUser() {
    let userId = localStorage.getItem('userId');

    if (userId) {
      this.authService.getUserById(userId).subscribe({
        next: (user: UserModel) => {
          this.user = user;
        },
        complete: () => {
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
    const card = document.getElementById('card-container');
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
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
