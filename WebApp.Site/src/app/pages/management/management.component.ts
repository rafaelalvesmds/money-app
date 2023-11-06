import { Component } from '@angular/core';
import { error } from 'console';
import { MessageService } from 'primeng/api';
import { ActionsModel } from 'src/app/core/models/actions.model';
import { RegistryModel } from 'src/app/core/models/registry.model';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { ManagementService } from 'src/app/core/service/management.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {

  constructor(private managementService: ManagementService, private messageService: MessageService, private authService: AuthService) { }

  rowSelected!: any;

  cards = [
    {
      title: 'Receita',
      value: '$2,100',
      icon: 'pi pi-map-marker',
      bgColor: 'bg-green-100',
      changeValue: '+%52',
      changeText: 'Nov/2023',
      colorChangeValue: 'red'
    },
    {
      title: 'Gasto',
      value: '$2,100',
      icon: 'pi pi-map-marker',
      bgColor: 'bg-red-100',
      changeValue: '+%52',
      changeText: 'Nov/2023',
      colorChangeValue: 'green'
    },
    {
      title: 'Saldo',
      value: '$2,100',
      icon: 'pi pi-map-marker',
      bgColor: 'bg-orange-100',
      changeValue: '+%52',
      changeText: 'Nov/2023',
      colorChangeValue: 'red'
    },
    {
      title: 'Top 1',
      value: '$1,100',
      icon: 'pi pi-map-marker',
      bgColor: 'bg-orange-400',
      changeValue: 'Cartão de crédito',
      colorChangeValue: 'orange'
    },
  ];

  registries = [];
  expenses = [];
  incomes = [];

  columns: any[] = [
    { field: 'description', header: 'Description', width: '60%' },
    { field: 'type', header: 'Category', useTag: true, width: '20%', alignment: 'center' },
    { field: 'price', header: 'Price', width: '20%', alignment: 'right', pipe: 'money' },
  ]

  actions: ActionsModel[] = [
    {
      icon: 'pi pi-pencil',
      command: () => this.editRegistry()
    },
    {
      icon: 'pi pi-trash',
      command: () => this.deleteRegistry()
    }
  ]
  visible: boolean = false;

  typeAction: "register" | "edit" = "register";

  user!: UserModel;

  activeIndex: number = 0;

  ngOnInit() {
    this.getUser()
  }

  receiveRegistrySelected(e: any) {
    this.rowSelected = e;
  }

  getAllRegristries() {
    this.managementService.getAllRegristries(this.user.email).subscribe({
      next: (res: any) => {
        console.log(res.registries)

        this.registries = res.registries;
      },
      error: (error: any) => {
        // console.log(error.error.notifications, 'error notifications')
      }
    })
  }

  createRegistry(e: any) {
    this.managementService.createRegistry(e.registry).subscribe({
      next: (res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.notifications[0].message });
        this.visible = e.visible;
        this.getAllRegristries();
      },
    })
  }

  updateRegistry(e: RegistryModel) {
    this.visible = false;

    this.managementService.updateRegistry(e).subscribe({
      next: (res: any) => {
        this.getAllRegristries();
      }
    })
  }

  editRegistry() {
    console.log(this.rowSelected, 'kd')

    this.typeAction = 'edit'
    this.visible = true
  }

  deleteRegistry() {

    this.managementService.deleteRegistry(this.rowSelected.id).subscribe({
      next: (res: any) => {
        if (res.success)
          this.getAllRegristries()
      }
    })
  }

  addRegistry() {
    this.visible = true
  }

  getUser() {
    let userId = localStorage.getItem('userId');

    if (userId) {
      this.authService.getUserById(userId).subscribe({
        next: (user: UserModel) => {
          this.user = user;
        },
        complete: () => {
          this.getAllRegristries();
        }
      })

    }
  }


}

