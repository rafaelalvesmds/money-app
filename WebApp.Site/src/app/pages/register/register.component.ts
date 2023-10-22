import { trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../styles.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      passwordConfirm: [null, [Validators.required]],
      cellphone: [null, []]
    })

    this.registerForm.valueChanges.subscribe({
      next: () => {
        this.registerForm.clearValidators();
      }
    })
  }

  back() {
    this.router.navigate(['/login']);
  }

  save() {
    var form = this.registerForm.value

    var user: UserModel = {
      name: form.name,
      email: form.email,
      cellphone: form.cellphone,
      password: form.password,
    }

    if (form.password === form.passwordConfirm) {
      this.authService.register(user).subscribe({
        next: (res: any) => {
          this.showSuccess(res.notifications[0].message)
        },
        error: (error: any) => {
          if (error.status == 400)
            this.showError(error.error.notifications[0].message)
        }
      })
    } else {
      this.registerForm.controls['passwordConfirm'].setErrors({ invalid: true })
      this.showError("As senhas devem ser iguais")
    }
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
}
