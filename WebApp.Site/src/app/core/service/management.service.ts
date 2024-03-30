import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistryModel } from '../models/registry.model';
import { RegistryTypeModel } from '../models/registryType.model';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  // private apiBaseUrl = 'https://moneyapp.com.br/api/v1/management';
  private apiBaseUrl = 'https://localhost:5001/api/v1/management';

  constructor(private http: HttpClient) { }
  getAllRegristries(userId: any, date: any): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/GetAllRegristries?userId=${userId}&date=${date}`);
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

  getAllRegristriesTypes(userId: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/GetAllRegistriesTypes?userId=${userId}`);
  }

  createRegistryType(registryType: RegistryTypeModel): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/CreateRegistryType`, registryType);
  }
}
