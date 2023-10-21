import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  msgError!: string;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

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
        this.saveToken(response.token)
      },
      (error: any) => {
        this.msgError = error.error.notifications[0].message
      }
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  register() {
    this.router.navigate(['/register']);
  }
}
