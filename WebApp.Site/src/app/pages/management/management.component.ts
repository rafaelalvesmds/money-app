import { Component, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RegistryCategoryEnum } from 'src/app/core/enums/registryCategory.enum';
import { ActionsModel } from 'src/app/core/models/actions.model';
import { RegistryModel } from 'src/app/core/models/registry.model';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/service/auth.service';
import { ManagementService } from 'src/app/core/service/management.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class ManagementComponent {

  managementService = inject(ManagementService);
  messageService = inject(MessageService);
  authService = inject(AuthService);
  elRef = inject(ElementRef);
  renderer = inject(Renderer2);

  rowSelected!: any;

  registries = [];
  expenses = [];
  incomes = [];

  registryTypes: { id: number; name: string; category: number; color: string; }[] = []

  columns: any[] = [
    // { field: 'description', header: 'Descrição', width: '50%' },
    {
      field: 'type',
      header: 'Tipo',
      useTag: true,
      width: '50%',
      alignment: 'left',
      pipe: 'registryType'
    },
    {
      field: 'date',
      header: 'Data',
      width: '25%',
      alignment: 'center',
      pipe: 'date',
    },
    {
      field: 'price',
      header: 'Valor',
      width: '25%',
      alignment: 'right',
      pipe: 'money',
    },
  ];

  columnsSmallScreen: any[] = [
    {
      field: 'type',
      header: 'Tipo',
      useTag: true,
      width: '65%',
      alignment: 'left',
      pipe: 'registryType'
    },
    {
      field: 'price',
      header: 'Valor',
      width: '35%',
      alignment: 'right',
      pipe: 'money',
    },
  ];

  actions: ActionsModel[] = [
    {
      icon: 'pi pi-pencil',
      command: () => {
        this.editRegistry(this.rowSelected.category);
      },
    },
    {
      icon: 'pi pi-trash',
      command: () => this.deleteRegistry(),
    },
  ];
  visible: boolean = false;

  typeAction: 'register' | 'edit' = 'register';

  user!: UserModel;

  activeIndex: number = 0;

  registryCategoryEnum = RegistryCategoryEnum;
  registryCategory!: number;

  totalExpensesPrice: number = 0;
  totalIncomesPrice: number = 0;
  balance: any = 0;
  biggestExpense!: { type: number; value: number };

  cards: any[] = [];

  screenWidth!: number;
  screenHeigth!: number;

  dateSelected!: any;

  widthDialog!: string;

  showSpinner: boolean = false;

  headerDialogLoading: boolean = false;

  data = {
    datasets: [
      {
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'red',
          'green',
          'yellow',
          'gray',
          'blue'
        ],
        label: 'My dataset'
      }
    ],
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue']
  };

  options = {
    plugins: {
      legend: {
        labels: {
          color: 'red'
        }
      }
    },
    scales: {
      r: {
        grid: {
          color: 'blue'
        }
      }
    }
  };


  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeigth = window.innerHeight;
    this.getUser();
    this.setCardResponsivity();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
    this.screenHeigth = window.innerHeight;
    this.setCardResponsivity();
  }

  receiveRegistrySelected(e: any) {
    this.rowSelected = e;
  }

  getAllRegristries() {
    this.showSpinner = true;

    if (this.user?.email) {
      this.managementService
        .getAllRegristries(this.user?.id, this.dateSelected)
        .subscribe({
          next: (res: any) => {
            this.registries = res.registry;

            this.expenses = this.registries.filter((registry: any) => {
              return registry.category === 1;
            });

            this.incomes = this.registries.filter((registry: any) => {
              return registry.category === 2;
            });
          },
          error: (error: any) => {
            this.showSpinner = false;
          },
          complete: () => {
            this.calculateValues();
            this.showSpinner = false;
          },
        });
    }
  }

  getRegistryTypes() {
    let userId = localStorage.getItem('userId');

    if (userId) {
      this.managementService.getAllRegristriesTypes(userId).subscribe({
        next: (res: any) => {
          this.registryTypes = res.registry;
        },
      })
    }
  }

  createRegistry(e: any) {
    this.showSpinner = true;

    if (e == false) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The fields are invalid',
      });
      this.showSpinner = false;
    } else {
      this.managementService.createRegistry(e.registry).subscribe({
        next: (res: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.notifications[0].message,
          });
          this.visible = e.visible;
          this.getAllRegristries();
        },
        error: (error: any) => {
          this.showSpinner = false;
        },
      });
    }
  }

  updateRegistry(e: RegistryModel) {
    this.showSpinner = true;
    this.visible = false;

    this.managementService.updateRegistry(e).subscribe({
      next: (res: any) => {
        this.getAllRegristries();
      },
      error: (error: any) => {
        this.showSpinner = false;
      },
    });
  }

  editRegistry(registryCategory: RegistryCategoryEnum) {
    this.typeAction = 'edit';
    this.registryCategory = registryCategory;
    this.visible = true;
  }

  deleteRegistry() {
    this.showSpinner = true;

    this.managementService.deleteRegistry(this.rowSelected.id).subscribe({
      next: (res: any) => {
        if (res.success) this.getAllRegristries();
      },
      error: (error: any) => {
        this.showSpinner = false;
      },
    });
  }

  addRegistry(registryCategory: RegistryCategoryEnum) {
    this.typeAction = 'register';
    this.registryCategory = registryCategory;
    this.visible = true;
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
          this.getRegistryTypes();
        },
      });
    }
  }

  activeIndexChange(e: any) {
    this.activeIndex = e;
    this.setAnalyticsValues()
  }

  calculateValues() {
    this.totalExpensesPrice = this.expenses.reduce(
      (total: number, expense: any) => {
        return total + expense.price;
      },
      0
    );

    this.totalIncomesPrice = this.incomes.reduce(
      (total: number, income: any) => {
        return total + income.price;
      },
      0
    );

    this.balance = (this.totalIncomesPrice - this.totalExpensesPrice).toFixed(2);

    this.calculateBiggestExpense();
    this.setAnalyticsValues();
  }

  calculateBiggestExpense() {
    const expensesByType: { [key: string]: number } = {};
    this.biggestExpense = { type: 0, value: 0 };

    this.expenses.forEach((expense: any) => {
      if (!expensesByType[expense.type]) {
        expensesByType[expense.type] = expense.price;
      } else {
        expensesByType[expense.type] += expense.price;
      }
    });

    for (const type in expensesByType) {
      if (expensesByType[type] > this.biggestExpense.value) {
        this.biggestExpense.value = expensesByType[type];
        this.biggestExpense.type = Number(type);
      }
    }
  }

  setAnalyticsValues() {
    if (this.screenWidth > 576) {
      this.cards = [
        {
          title: 'Receitas',
          value: `R$${this.totalIncomesPrice}`,
          icon: 'pi pi-chart-line',
          bgColor: 'bg-green-100',
          // changeValue: '+%52',
          // changeText: 'Nov/2023',
          // colorChangeValue: 'red'
        },
        {
          title: 'Despesas',
          value: `R$${this.totalExpensesPrice}`,
          icon: 'pi pi-money-bill',
          bgColor: 'bg-red-100',
          // changeValue: '+%52',
          // changeText: 'Nov/2023',
          // colorChangeValue: 'green'
        },
        {
          title: 'Saldo',
          value: `R$${this.balance}`,
          icon: 'pi pi-wallet',
          bgColor: 'bg-orange-100',
          textColor: this.balance >= 0 ? 'text-green-300' : 'text-red-300',
          // changeValue: '+%52',
          // changeText: 'Nov/2023',
          // colorChangeValue: 'red'
        },
        // {
        //   title: 'Top 1',
        //   value: `$${this.biggestExpense?.value}`,
        //   icon: 'pi pi-star-fill',
        //   bgColor: 'bg-blue-300',
        //   changeValue: `${ExpenseTypeEnum[this.biggestExpense?.type]}`,
        //   colorChangeValue: 'blue'
        // },
      ];
    } else {
      if (this.activeIndex == 1) {
        this.cards = [
          {
            title: 'Despesas',
            value: `R$${this.totalExpensesPrice.toFixed(2)}`,
            icon: 'pi pi-money-bill',
            bgColor: 'bg-red-100',
            // changeValue: '+%52',
            // changeText: 'Nov/2023',
            // colorChangeValue: 'green'
          },
        ]
      } else if (this.activeIndex == 2) {
        this.cards = [
          {
            title: 'Receitas',
            value: `R$${this.totalIncomesPrice.toFixed(2)}`,
            icon: 'pi pi-chart-line',
            bgColor: 'bg-green-100',
            // changeValue: '+%52',
            // changeText: 'Nov/2023',
            // colorChangeValue: 'red'
          },
        ]
      } else {
        this.cards = [
          {
            title: 'Saldo',
            value: `R$${this.balance}`,
            icon: 'pi pi-wallet',
            bgColor: 'bg-orange-100',
            textColor: this.balance >= 0 ? 'text-green-300' : 'text-red-300',
            // changeValue: '+%52',
            // changeText: 'Nov/2023',
            // colorChangeValue: 'red'
          },
        ];
      }

    }
  }

  setCardResponsivity() {
    const fullCard = document.getElementById('full-container');
    const table = document.getElementById('management-container');

    if (fullCard) {
      fullCard.style.height = `${this.screenHeigth * 0.9}px`;
    }

    if (table) table.style.overflowX = 'hidden';

    if (table && this.screenWidth >= 1200) {
      table.style.height = `${Number(fullCard?.clientHeight) * 0.79}px`;
      table.style.width = '100%';
      this.widthDialog = '35vw';
    }

    if (table && this.screenWidth >= 960 && this.screenWidth < 1200) {
      table.style.height = `${Number(fullCard?.clientHeight) * 0.79}px`;
      table.style.width = '100%';
      this.widthDialog = '45vw';
    }

    if (table && this.screenWidth >= 576 && this.screenWidth < 960) {
      table.style.height = `${Number(fullCard?.clientHeight) * 0.79}px`;
      table.style.width = '100%';
      this.widthDialog = '55vw';
    }

    if (table && this.screenWidth < 576) {
      table.style.height = `${Number(fullCard?.clientHeight) * 0.79}px`;
      table.style.width = '100%';
      this.widthDialog = '80vw';
    }



    this.setAnalyticsValues();
  }

  receiveDateSelected(date: Date) {
    this.dateSelected = date.toISOString();
    this.getAllRegristries();
  }

  setStyleHeaderDialog(): void {
    let dialogHeader = this.elRef.nativeElement.querySelector('.p-dialog .p-dialog-header');

    if (this.registryCategory == 1) {
      this.renderer.setStyle(dialogHeader, 'background-color', 'rgb(187 15 15)');
    } else {
      this.renderer.setStyle(dialogHeader, 'background-color', 'rgb(38 131 72)');
    }

    this.headerDialogLoading = true;
  }

  onHideDialog() {
    this.getRegistryTypes()
    this.headerDialogLoading = false;
  }
}
