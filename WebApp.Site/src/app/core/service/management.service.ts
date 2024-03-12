import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistryModel } from '../models/registry.model';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  private apiBaseUrl = 'https://moneyapp.com.br/api/v1/management';
  // private apiBaseUrl = 'https://localhost:5001/api/v1/management';

  constructor(private http: HttpClient) { }
  getAllRegristries(email: string, date: any): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/GetAllRegristries?email=${email}&date=${date}`);
  }

  createRegistry(registry: RegistryModel): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/CreateRegistry`, registry);
  }

  updateRegistry(registry: RegistryModel): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/UpdateRegistry`, registry);
  }

  deleteRegistry(id: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/DeleteRegistry/${id}`);
  }
}
