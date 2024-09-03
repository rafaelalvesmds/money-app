import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from 'src/app/core/models/user.model';

@Component({
  selector: 'registry-type-form',
  standalone: false,
  templateUrl: './registry-type-form.component.html',
  styleUrl: './registry-type-form.component.scss'
})
export class RegistryTypeFormComponent implements OnInit {

  fb = inject(FormBuilder);

  @Input() registryCategory!: number;
  @Input() user!: UserModel;

  @Output() registryTypeEmit = new EventEmitter<any>()

  registryTypeForm!: FormGroup;

  ngOnInit(): void {
    this.registryTypeForm = this.fb.group({
      name: [null, []],
      category: [null, []],
      userId: [null, []],
      color: ['#e0e0e0', []]
    })
  }

  emitRegistryType() {
    this.registryTypeForm.controls['category'].setValue(this.registryCategory)
    this.registryTypeForm.controls['userId'].setValue(this.user?.id)

    if (this.registryTypeForm.valid) {
      this.registryTypeEmit.emit(this.registryTypeForm.value)
      this.registryTypeForm.reset();
    } else {
      this.registryTypeEmit.emit(false)
    }
  }
}
