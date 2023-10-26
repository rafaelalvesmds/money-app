export interface ExpenseModel {
  id: number;
  email: string;
  name: string;
  expenseType: number;
  price: number;
  mounth: number;
  year: number;
  includedDate: Date;
  expenseDate: Date;
}
