import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { RegistryModel } from 'src/app/core/models/registry.model';
import { UserModel } from 'src/app/core/models/user.model';
import { DomainService } from 'src/app/core/service/domain.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['./registry-form.component.css']
})
export class RegistryFormComponent implements OnInit, OnChanges {

  @Output() registryEmit = new EventEmitter<any>()
  @Output() registryEdit = new EventEmitter<any>()

  @Input() registryForm!: FormGroup;
  @Input() user!: UserModel;
  @Input() typeAction: "register" | "edit" = "register";
  @Input() registryToEdit!: RegistryModel;
  @Input() registryCategory!: number;
  @Input() date!: any;

  expenseTypes!: { id: number; name: string }[];
  incomeTypes!: { id: number; name: string }[];

  items: MenuItem[] = [
    {
      label: 'Salvar e registrar outra',
      icon: 'pi pi-save',
      command: () => {
        this.emitRegistry(true)
      }
    }
  ];

  constructor(private fb: FormBuilder, private domainService: DomainService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.typeAction == 'edit' && this.registryToEdit) {
      this.registryToEdit ? this.registryForm.patchValue(this.registryToEdit) : '';
      this.registryForm?.controls['date'].setValue(new Date(this.registryToEdit.date))
      this.registryForm?.controls['type'].setValue(this.registryToEdit.type)
    }
    else if (this.typeAction = 'register') {
      this.registryForm?.reset();
      // this.registryForm?.controls['updatedDate'].setValue(new Date())
    }
  }


  ngOnInit() {
    this.getDomainTypes();
    this.configureForm();
  }

  configureForm() {
    this.registryForm = this.fb.group({
      id: [null],
      description: [null, [Validators.required]],
      email: [null, [Validators.required]],
      price: [null, [Validators.required]],
      type: [null, [Validators.required]],
      category: [null, [Validators.required]],
      date: [null, [Validators.required]],
      includedDate: [null, [Validators.required]],
    })
  }

  getDomainTypes() {
    this.domainService.getExpenseTypes().subscribe({
      next: (res: any) => {
        this.expenseTypes = res;
      }
    })

    this.domainService.getIncomeTypes().subscribe({
      next: (res: any) => {
        this.incomeTypes = res;
      }
    })
  }

  emitRegistry(registerAnother: boolean) {
    this.registryForm.controls['email'].setValue(this.user?.email)
    this.registryForm.controls['includedDate'].setValue(new Date())
    this.registryForm.controls['category'].setValue(this.registryCategory)
    this.registryForm.controls['id'].setValue(uuidv4())
    this.registryForm.controls['date'].setValue(this.date)

    if (this.registryForm.valid) {
      this.registryEmit.emit({ registry: this.registryForm.value, visible: registerAnother })
      this.registryForm.reset();
    } else {
      this.registryEmit.emit(false)
    }
  }

  emitEditedRegistry() {
    this.registryEdit.emit(this.registryForm.value)
  }
}
