import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IncomeModel } from '../models/income.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private apiBaseUrl = 'https://localhost:5001/api/v1/income';

  constructor(private http: HttpClient) { }

  getIncomes(email: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/GetIncomes?email=${email}`);
  }

  createIncome(income: IncomeModel): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/CreateIncome`, income);
  }

  updateIncome(income: IncomeModel): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/UpdateIncome`, income);
  }

  deleteIncome(id: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/DeleteIncome/${id}`);
  }
}
