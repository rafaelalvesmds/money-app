import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseModel } from 'src/app/core/models/expense.model';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { DomainService } from 'src/app/core/service/domain.service';

@Component({
  selector: 'app-expense-form-register',
  templateUrl: './expense-form-register.component.html',
  styleUrls: ['./expense-form-register.component.css']
})
export class ExpenseFormRegisterComponent implements OnInit, OnChanges {
  @Input() expenseForm!: FormGroup;

  @Output() expenseEmit = new EventEmitter<any>()
  @Output() expenseEdit = new EventEmitter<any>()

  expenseTypes!: { id: number; name: string }[];

  user!: UserModel;

  @Input() typeAction: "register" | "edit" = "register";

  @Input() expenseToEdit!: ExpenseModel;


  constructor(private fb: FormBuilder, private domainService: DomainService, private authService: AuthService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.expenseToEdit, 'oe')
    if (this.typeAction = 'edit') {
      this.expenseToEdit ? this.expenseForm.patchValue(this.expenseToEdit) : '';
      this.expenseForm.controls['expenseDate'].setValue(new Date(this.expenseToEdit.expenseDate))
      this.expenseForm.controls['expenseType'].setValue(this.expenseToEdit.expenseType)
    }

  }


  ngOnInit() {
    this.getExpenseTypes();
    this.getUser();
    this.configureForm();
  }

  configureForm() {
    this.expenseForm = this.fb.group({
      description: [null, [Validators.required]],
      email: [null, [Validators.required]],
      price: [null, [Validators.required]],
      expenseType: [null, [Validators.required]],
      expenseDate: [null, [Validators.required]],
      includedDate: [null, [Validators.required]],
    })
  }

  getExpenseTypes() {
    this.domainService.getExpenseTypes().subscribe({
      next: (res: any) => {
        this.expenseTypes = res;
      }
    })
  }

  emitExpense(registerAnother: boolean) {
    this.expenseForm.controls['email'].setValue(this.user?.email)
    this.expenseForm.controls['includedDate'].setValue(new Date())

    if (this.expenseForm.valid) {
      this.expenseEmit.emit({ expense: this.expenseForm.value, visible: registerAnother })
      this.expenseForm.reset();
    }
  }

  emitEditedExpense() {
    this.expenseEdit.emit(this.expenseForm.value)
  }

  getUser() {
    let userId = localStorage.getItem('userId');

    if (userId) {
      this.authService.getUserById(userId).subscribe({
        next: (user: UserModel) => {
          console.log(user, 'user')
          this.user = user;
        }
      })

    }
  }
}
