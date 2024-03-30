import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistryModel } from 'src/app/core/models/registry.model';
import { UserModel } from 'src/app/core/models/user.model';
import { ManagementService } from 'src/app/core/service/management.service';
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

  registryTypes: { id: number; name: string; category: number; color: string; }[] = []

  visible!: boolean;

  optionsType: { id: number; name: string; category: number; color: string; }[] = []

  constructor(private fb: FormBuilder, private managementService: ManagementService) { }

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

    if (changes['registryCategory']) {
      this.getRegistryTypes();
    }
  }

  ngOnInit() {
    this.configureForm();
  }

  configureForm() {
    this.registryForm = this.fb.group({
      id: [null],
      description: [null, [Validators.required]],
      userId: [null, [Validators.required]],
      price: [null, [Validators.required]],
      type: [null, [Validators.required]],
      category: [null, [Validators.required]],
      date: [null, [Validators.required]],
      includedDate: [null, [Validators.required]],
    })
  }

  getRegistryTypes() {
    let userId = localStorage.getItem('userId');

    if (userId) {
      this.managementService.getAllRegristriesTypes(userId).subscribe({
        next: (res: any) => {
          this.registryTypes = res.registry;
        },
        complete: () => {
          this.setResgistryTypes()
        }
      })
    }
  }

  setResgistryTypes() {
    this.optionsType = this.registryTypes.filter((x) => x.category == this.registryCategory);
  }

  emitRegistry(registerAnother: boolean) {
    this.registryForm.controls['userId'].setValue(this.user?.id)
    this.registryForm.controls['includedDate'].setValue(new Date())
    this.registryForm.controls['category'].setValue(this.registryCategory)
    this.registryForm.controls['id'].setValue(uuidv4())

    if (!this.registryForm.controls['date'].value)
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

  showDialogRegistryType() {
    this.visible = true;
  }

  createRegistryType(e: any) {
    this.managementService.createRegistryType(e).subscribe({
      next: (res: any) => {
        this.visible = false;
      },
      error: (error: any) => { },
      complete: () => {
        this.getRegistryTypes()
      }
    })
  }

}
