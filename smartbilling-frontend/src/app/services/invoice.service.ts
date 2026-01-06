import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvoiceResponse, InvoiceRequest } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private apiUrl = 'https://morning-river-09236-d916246857b3.herokuapp.com/api/invoices';

  constructor(private http: HttpClient) {}

  getAll(): Observable<InvoiceResponse[]> {
    return this.http.get<InvoiceResponse[]>(this.apiUrl);
  }

  getByReference(ref: string): Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(`${this.apiUrl}/by-ref`, { params: { ref } });
  }

  getById(id: string): Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(`${this.apiUrl}/${id}`);
  }

  create(inv: InvoiceRequest): Observable<InvoiceResponse> {
    return this.http.post<InvoiceResponse>(this.apiUrl, inv);
  }

  updateById(id: string, inv: Partial<InvoiceRequest>): Observable<InvoiceResponse> {
    return this.http.put<InvoiceResponse>(`${this.apiUrl}/${id}`, inv);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
