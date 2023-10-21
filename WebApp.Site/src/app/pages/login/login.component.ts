import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        this.router.navigate(['/dashboard']);
        this.saveToken(response.token)
      },
      (error: any) => {
        console.log(error, 'error')
      }
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
