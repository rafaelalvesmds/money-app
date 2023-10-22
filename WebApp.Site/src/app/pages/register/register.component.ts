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
  }

  back() {
    this.router.navigate(['/login']);
  }

  save() {
    console.log(this.registerForm, 'v')
    if (this.registerForm.valid) {

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
            console.log(res, 'register')
            this.showSuccess(res.notifications[0].message)
          },
          error: (error: any) => {
            this.showError(error.error.notifications[0].message)
          }
        })
      } else {
        this.registerForm.controls['passwordConfirm'].setErrors({ invalid: true })
        this.registerForm.controls['password'].setErrors({ invalid: true })
        this.showError("As senhas devem ser iguais")
      }

    } else {
      this.checkValues();
      //nessa parte

    }

  }

  checkValues() {
    Object.keys(this.registerForm.controls).forEach((controlName) => {
      const control = this.registerForm.get(controlName);

      if (control) {
        control.markAsDirty(); // Marcar o controle como "touched"
      }
    });

    // Verifique novamente e marque como inválidos apenas os campos obrigatórios
    Object.keys(this.registerForm.controls).forEach((controlName) => {
      const control = this.registerForm.get(controlName);

      if (control && control.hasError('required') && !control.value) {
        control.setErrors({ invalid: true });
      }
    });

    this.showError("Preencha os campos obrigatórios")
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
}
