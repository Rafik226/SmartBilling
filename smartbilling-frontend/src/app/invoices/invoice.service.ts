import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { InvoiceRequest, InvoiceResponse } from '../shared/models/invoice.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private base = '/api/invoices';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    const token = this.auth.getToken();
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  async list(): Promise<InvoiceResponse[]> {
    return firstValueFrom(this.http.get<InvoiceResponse[]>(this.base, { headers: this.headers() }));
  }

  async getById(id: number): Promise<InvoiceResponse> {
    return firstValueFrom(this.http.get<InvoiceResponse>(`${this.base}/${id}`, { headers: this.headers() }));
  }

  async findByRef(ref: string): Promise<InvoiceResponse> {
    const params = new HttpParams().set('ref', ref);
    return firstValueFrom(this.http.get<InvoiceResponse>(`${this.base}/by-ref`, { params, headers: this.headers() }));
  }

  async create(dto: InvoiceRequest): Promise<InvoiceResponse> {
    return firstValueFrom(this.http.post<InvoiceResponse>(this.base, dto, { headers: this.headers() }));
  }

  async update(id: number, dto: InvoiceRequest): Promise<InvoiceResponse> {
    return firstValueFrom(this.http.put<InvoiceResponse>(`${this.base}/${id}`, dto, { headers: this.headers() }));
  }

  async delete(id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${this.base}/${id}`, { headers: this.headers() }));
  }
}
