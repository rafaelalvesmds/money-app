import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../../styles.scss'],
})
export class RegisterComponent implements OnInit {

  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  messageService = inject(MessageService);

  registerForm = signal<FormGroup>(new FormGroup({}));

  showSpinner = signal<boolean>(false);

  constructor() {
    effect(() => {
      this.registerForm().clearValidators();
    })
  }

  ngOnInit(): void {
    this.registerForm.set(this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]],
      cellphone: [null, []],
    }));
  }

  back() {
    this.router.navigate(['/login']);
  }

  save() {
    this.showSpinner.set(true);

    var form = this.registerForm().value;

    var user: UserModel = {
      name: form.name,
      email: form.email,
      cellphone: form.cellphone,
      password: form.password,
      registrationDate: new Date(),
    };

    if (form.password === form.passwordConfirm) {
      this.authService.register(user).subscribe({
        next: (res: any) => {
          this.showMessage('success', res.notifications[0].message);
          this.router.navigate(['/login'], {
            queryParams: { message: res.notifications[0].message },
          });
        },
        error: (error: any) => {
          if (error.status == 400)
            this.showMessage('error', error.error.notifications[0].message);

          this.showSpinner.set(false);
        },
        complete: () => {
          this.showSpinner.set(false);
        },
      });
    } else {
      this.registerForm().controls['passwordConfirm'].setErrors({
        invalid: true,
      });
      this.showMessage('error', 'Passwords must be the same');

      this.showSpinner.set(false);
    }
  }

  showMessage(severity: string, message: string) {
    this.messageService.add({
      severity: severity,
      summary: severity,
      detail: message,
    });
  }
}
