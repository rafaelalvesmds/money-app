import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../styles.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  queryParams: any;
  showSpinner: boolean = false;


  @HostListener('document:keydown.enter', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.loginForm.valid)
      this.onLoginSubmit();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.checkQueryParams();
  }

  onLoginSubmit() {
    this.showSpinner = true;

    this.authService
      .login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      )
      .subscribe({
        next: (response: any) => {
          this.router.navigate(['/management']);
          this.saveToken(response);
        },
        error: (error: any) => {
          this.showError(error.error.notifications[0]?.message);
          this.showSpinner = false;
        },
        complete: () => {
          this.showSpinner = false;
        },
      });
  }

  saveToken(response: any): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('userId', response.userId);
  }

  register() {
    this.router.navigate(['/register']);
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  showInfo(message: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }

  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  checkQueryParams() {
    this.route.queryParams.subscribe((params: any) => {
      this.queryParams = params;
    });

    if (this.queryParams.message != undefined) {
      setTimeout(() => {
        this.showInfo(this.queryParams.message);
      }, 100);
    } else if (this.queryParams.email != undefined) {
      this.authService.ConfirmEmail(this.queryParams.email, this.queryParams.token).subscribe({
        next: (res: any) => {
          this.showSuccess(res[0].message);
        },
        error: (error: any) => {
          this.showError(error.error[0].message);
        }
      })
    }
  }
}
