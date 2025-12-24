import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LineItemRequest, LineItemResponse } from '../shared/models/line-item.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class LineItemService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    const token = this.auth.getToken();
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  async list(invoiceId: number) {
    return firstValueFrom(this.http.get<LineItemResponse[]>(`/api/invoices/${invoiceId}/items`, { headers: this.headers() }));
  }

  async get(invoiceId: number, id: number) {
    return firstValueFrom(this.http.get<LineItemResponse>(`/api/invoices/${invoiceId}/items/${id}`, { headers: this.headers() }));
  }

  async create(invoiceId: number, dto: LineItemRequest) {
    return firstValueFrom(this.http.post<LineItemResponse>(`/api/invoices/${invoiceId}/items`, dto, { headers: this.headers() }));
  }

  async update(invoiceId: number, id: number, dto: LineItemRequest) {
    return firstValueFrom(this.http.put<LineItemResponse>(`/api/invoices/${invoiceId}/items/${id}`, dto, { headers: this.headers() }));
  }

  async delete(invoiceId: number, id: number) {
    return firstValueFrom(this.http.delete<void>(`/api/invoices/${invoiceId}/items/${id}`, { headers: this.headers() }));
  }
}
