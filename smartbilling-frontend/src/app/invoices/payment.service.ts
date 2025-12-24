import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PaymentRequest, PaymentResponse } from '../shared/models/payment.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    const token = this.auth.getToken();
    return new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
  }

  async list(invoiceId: number) {
    return firstValueFrom(this.http.get<PaymentResponse[]>(`/api/invoices/${invoiceId}/payments`, { headers: this.headers() }));
  }

  async get(invoiceId: number, id: number) {
    return firstValueFrom(this.http.get<PaymentResponse>(`/api/invoices/${invoiceId}/payments/${id}`, { headers: this.headers() }));
  }

  async create(invoiceId: number, dto: PaymentRequest) {
    return firstValueFrom(this.http.post<PaymentResponse>(`/api/invoices/${invoiceId}/payments`, dto, { headers: this.headers() }));
  }

  async delete(invoiceId: number, id: number) {
    return firstValueFrom(this.http.delete<void>(`/api/invoices/${invoiceId}/payments/${id}`, { headers: this.headers() }));
  }
}
