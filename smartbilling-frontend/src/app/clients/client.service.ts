import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ClientRequest, ClientResponse } from '../shared/models/client.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private base = '/api/clients';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    const token = this.auth.getToken();
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  async getAll(): Promise<ClientResponse[]> {
    return firstValueFrom(this.http.get<ClientResponse[]>(this.base, { headers: this.headers() }));
  }

  async getById(id: number): Promise<ClientResponse> {
    return firstValueFrom(this.http.get<ClientResponse>(`${this.base}/${id}`, { headers: this.headers() }));
  }

  async findByEmail(email: string): Promise<ClientResponse> {
    const params = new HttpParams().set('email', email);
    return firstValueFrom(this.http.get<ClientResponse>(`${this.base}/by-email`, { params, headers: this.headers() }));
  }

  async findByName(name: string): Promise<ClientResponse> {
    const params = new HttpParams().set('name', name);
    return firstValueFrom(this.http.get<ClientResponse>(`${this.base}/by-name`, { params, headers: this.headers() }));
  }

  async create(dto: ClientRequest): Promise<ClientResponse> {
    return firstValueFrom(this.http.post<ClientResponse>(this.base, dto, { headers: this.headers() }));
  }

  async update(id: number, dto: ClientRequest): Promise<ClientResponse> {
    return firstValueFrom(this.http.put<ClientResponse>(`${this.base}/${id}`, dto, { headers: this.headers() }));
  }

  async delete(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.base}/${id}`, { headers: this.headers() }));
  }
}
