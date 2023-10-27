export interface ExpenseModel {
  id: string;
  email: string;
  description: string;
  expenseType: number;
  price: number;
  includedDate: Date;
  expenseDate: Date;
}
