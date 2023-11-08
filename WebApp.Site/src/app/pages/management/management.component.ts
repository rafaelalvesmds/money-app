import { Component, HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExpenseTypeEnum } from 'src/app/core/enums/expenseType.enum';
import { IncomeTypeEnum } from 'src/app/core/enums/incomeType.enum';
import { RegistryCategoryEnum } from 'src/app/core/enums/registryCategory.enum';
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

  registries = [];
  expenses = [];
  incomes = [];

  columns: any[] = [
    { field: 'description', header: 'Description', width: '50%' },
    { field: 'type', header: 'Category', useTag: true, width: '20%', alignment: 'center' },
    { field: 'date', header: 'Date', width: '10%', alignment: 'center', pipe: 'date' },
    { field: 'price', header: 'Price', width: '20%', alignment: 'right', pipe: 'money' },
  ]

  columnsSmallScreen: any[] = [
    { field: 'description', header: 'Description', width: '70%' },
    { field: 'price', header: 'Price', width: '30%', alignment: 'right', pipe: 'money' },
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

  registryCategoryEnum = RegistryCategoryEnum;
  registryCategory!: number;

  totalExpensesPrice: number = 0;
  totalIncomesPrice: number = 0;
  balance: number = 0;
  biggestExpense!: { type: number, value: number };

  cards: any[] = [];

  screenWidth!: number;
  screenHeigth!: number;

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.screenHeigth = window.innerHeight;
    this.getUser()
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
    this.managementService.getAllRegristries(this.user.email).subscribe({
      next: (res: any) => {
        this.registries = res.registry;

        console.log()

        this.expenses = this.registries.filter((registry: any) => {
          return registry.category === 1;
        });

        this.incomes = this.registries.filter((registry: any) => {
          return registry.category === 2;
        });

      },
      error: (error: any) => {
        // console.log(error.error.notifications, 'error notifications')
      },
      complete: () => {
        this.calculateValues();
      }
    })
  }

  createRegistry(e: any) {
    this.managementService.createRegistry(e.registry).subscribe({
      next: (res: any) => {
        console.log(res, 'res res create')
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.notifications[0].message });
        this.visible = e.visible;
        this.getAllRegristries();
      },
    })
  }

  updateRegistry(e: RegistryModel) {
    this.visible = false;

    console.log(e, 'update')

    this.managementService.updateRegistry(e).subscribe({
      next: (res: any) => {
        this.getAllRegristries();
      }
    })
  }

  editRegistry() {
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

  addRegistry(registryCategory: RegistryCategoryEnum) {
    this.registryCategory = registryCategory;
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

  activeIndexChange(e: any) {
    this.activeIndex = e;
  }

  calculateValues() {
    this.totalExpensesPrice = this.expenses.reduce((total: number, expense: any) => {
      return total + expense.price;
    }, 0);

    this.totalIncomesPrice = this.incomes.reduce((total: number, income: any) => {
      return total + income.price;
    }, 0);

    this.balance = this.totalIncomesPrice - this.totalExpensesPrice;

    this.calculateBiggestExpense()
    this.setAnalyticsValues();
  }

  calculateBiggestExpense() {
    const expensesByType: { [key: string]: number } = {};
    this.biggestExpense = { type: 0, value: 0 }

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


    if (this.screenWidth > 992) {
      this.cards = [
        {
          title: 'Incomes',
          value: `$${this.totalIncomesPrice},00`,
          icon: 'pi pi-money-bill',
          bgColor: 'bg-green-100',
          changeValue: '+%52',
          changeText: 'Nov/2023',
          colorChangeValue: 'red'
        },
        {
          title: 'Expenses',
          value: `$${this.totalExpensesPrice},00`,
          icon: 'pi pi-money-bill',
          bgColor: 'bg-red-100',
          changeValue: '+%52',
          changeText: 'Nov/2023',
          colorChangeValue: 'green'
        },
        {
          title: 'Balance',
          value: `$${this.balance},00`,
          icon: 'pi pi-wallet',
          bgColor: 'bg-orange-100',
          textColor: this.balance > 0 ? 'text-green-300' : 'text-red-300',
          changeValue: '+%52',
          changeText: 'Nov/2023',
          colorChangeValue: 'red'
        },
        {
          title: 'Top 1',
          value: `$${this.biggestExpense.value},00`,
          icon: 'pi pi-star-fill',
          bgColor: 'bg-blue-300',
          changeValue: `${ExpenseTypeEnum[this.biggestExpense.type]}`,
          colorChangeValue: 'blue'
        },
      ];
    } else {
      this.cards = [
        {
          title: 'Balance',
          value: `$${this.balance},00`,
          icon: 'pi pi-wallet',
          bgColor: 'bg-orange-100',
          textColor: this.balance > 0 ? 'text-green-300' : 'text-red-300',
          changeValue: '+%52',
          changeText: 'Nov/2023',
          colorChangeValue: 'red'
        },
        {
          title: 'Expenses',
          value: `$${this.totalExpensesPrice},00`,
          icon: 'pi pi-money-bill',
          bgColor: 'bg-red-100',
          changeValue: '+%52',
          changeText: 'Nov/2023',
          colorChangeValue: 'green'
        },
      ];
    }



  }

  setCardResponsivity() {
    const fullCard = document.getElementById('full-container'); // Substitua 'your-card-id' pelo ID real do seu elemento p-card
    const card = document.getElementById('management-container'); // Substitua 'your-card-id' pelo ID real do seu elemento p-card

    if (fullCard) {
      fullCard.style.height = `${this.screenHeigth * 0.9}px`
    }

    if (card) {
      card.style.height = '43rem'
      card.style.width = '100%'
    }

    if (card && this.screenWidth < 576) {
      card.style.height = '35rem'
    }

    this.setAnalyticsValues();

  }
}

