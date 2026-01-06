import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientResponse, ClientRequest } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private apiUrl = 'https://morning-river-09236-d916246857b3.herokuapp.com/api/clients';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ClientResponse[]> {
    return this.http.get<ClientResponse[]>(this.apiUrl);
  }

  getById(id: string): Observable<ClientResponse> {
    return this.http.get<ClientResponse>(`${this.apiUrl}/${id}`);
  }

  create(client: ClientRequest): Observable<ClientResponse> {
    return this.http.post<ClientResponse>(this.apiUrl, client);
  }

  update(id: string, client: Partial<ClientRequest>): Observable<ClientResponse> {
    return this.http.put<ClientResponse>(`${this.apiUrl}/${id}`, client);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
