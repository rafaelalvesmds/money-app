import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { UserModel } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = 'https://localhost:5001'; // Substitua pela URL da sua API

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/api/auth/login`, { email, password })
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  register(user: UserModel): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/api/auth/register`, user)
  }
}

