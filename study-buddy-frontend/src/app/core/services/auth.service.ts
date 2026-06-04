import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }

  register(data: any) {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }

  getProfile() {
    const token = localStorage.getItem('token');

    return this.http.get(`${environment.apiUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
