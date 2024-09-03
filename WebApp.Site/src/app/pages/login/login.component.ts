import { Component, EventEmitter, HostListener, inject, OnInit, Output, signal } from '@angular/core';
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

  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);
  messageService = inject(MessageService);
  route = inject(ActivatedRoute);

  loginForm = signal<FormGroup>(new FormGroup({}));

  showSpinner = signal<boolean>(false);

  @HostListener('document:keydown.enter', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.loginForm().valid)
      this.onLoginSubmit();
  }

  ngOnInit(): void {
    this.loginForm.set(this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }));

    this.getQueryParams().then(params => {
      this.checkQueryParams(params);
    });
  }

  getQueryParams(): Promise<any> {
    return new Promise((resolve) => {
      this.route.queryParams.subscribe((params: any) => {
        resolve(params);
      });
    });
  }

  onLoginSubmit() {
    this.showSpinner.set(true);

    this.authService
      .login(
        this.loginForm().controls['email'].value,
        this.loginForm().controls['password'].value
      )
      .subscribe({
        next: (response: any) => {
          this.router.navigate(['/management']);
          this.saveToken(response);
        },
        error: (error: any) => {
          this.showMessage('error', error.error.notifications[0]?.message);
          this.showSpinner.set(false);
        },
        complete: () => {
          this.showSpinner.set(false);
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

  showMessage(severity: string, message: string) {
    this.messageService.add({
      severity: severity,
      summary: severity,
      detail: message,
    });
  }

  checkQueryParams(params: any) {
    if (params['message'])
      this.showMessage('info', params.message);

    else if (params['email']) {
      this.authService.ConfirmEmail(params.email, params.token).subscribe({
        next: (res: any) => {
          this.showMessage('success', res[0].message);
        },
        error: (error: any) => {
          this.showMessage('error', error.error[0].message);
        }
      })
    }
  }
}
