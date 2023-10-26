import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense-form-register',
  templateUrl: './expense-form-register.component.html',
  styleUrls: ['./expense-form-register.component.css']
})
export class ExpenseFormRegisterComponent implements OnInit {
  @Input() expenseForm!: FormGroup;

  constructor(private fb: FormBuilder) {

  }


  ngOnInit() {
    this.expenseForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      price: [null, [Validators.required]],
      expenseType: [new Date(), [Validators.required]],
      includedDate: [new Date(), [Validators.required]],
      cellphone: [null, []]
    })

    this.expenseForm.valueChanges.subscribe({
      next: () => {
        this.expenseForm.clearValidators();
      }
    })
  }
}
