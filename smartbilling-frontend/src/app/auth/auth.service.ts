import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRequest, AuthResponse } from '../shared/models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = '/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Promise<string | null> {
    const body: AuthRequest = { username, password };
    return this.http.post<AuthResponse>(`${this.base}/login`, body).toPromise().then(res => {
      const token = res?.token || null;
      if (token) localStorage.setItem('auth_token', token);
      return token;
    });
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
