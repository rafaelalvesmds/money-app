import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpenseModel } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiBaseUrl = 'https://localhost:5001/api/v1/expenses';

  constructor(private http: HttpClient) { }

  getExpenses(email: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/GetExpenses?email=${email}`);
  }

  createExpense(expense: ExpenseModel): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/CreateExpense`, expense);
  }

  updateExpense(expense: ExpenseModel): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/UpdateExpense`, expense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/DeleteExpense/${id}`);
  }
}
