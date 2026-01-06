import { Injectable, computed, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequest, AuthResponse } from '../shared/models/auth.model';
import { decodeJwt } from './jwt.util';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private userSignal = signal<any | null>(this.getUserFromToken());

  constructor(private http: HttpClient) {}

  login(request: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.userSignal.set(this.getUserFromToken());
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.userSignal.set(null);
  }

  getUserFromToken() {
    const token = this.getToken();
    if (!token) return null;
    return decodeJwt(token);
  }

  currentUser$() {
    return computed(() => this.userSignal());
  }

  isAdmin = computed(() => {
    const user = this.userSignal();
    return user && user.roles && user.roles.includes('ROLE_ADMIN');
  });

  get currentUserValue() {
    return this.userSignal();
  }
}
