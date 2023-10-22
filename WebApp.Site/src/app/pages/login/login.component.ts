import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private messageService: MessageService, private userService: UserService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLoginSubmit() {
    this.authService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(
      (response: any) => {
        this.router.navigate(['/dashboard']);
        this.userService.setCurrentUser(response.user);
        this.saveToken(response)
      },
      (error: any) => {
        this.showError(error.error.notifications[0].message);
      }
    );
  }

  saveToken(response: any): void {
    localStorage.setItem('token', response.token);
  }

  register() {
    this.router.navigate(['/register']);
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

}
