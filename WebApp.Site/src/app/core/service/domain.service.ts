import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private apiBaseUrl = 'https://localhost:5001/api/v1/domain';

  constructor(private http: HttpClient) { }

  getExpenseTypes(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/GetExpenseTypes`);
  }

}
