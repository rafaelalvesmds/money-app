export interface ExpenseModel {
  id: number;
  email: string;
  description: string;
  expenseType: number;
  price: number;
  includedDate: Date;
  expenseDate: Date;
}
