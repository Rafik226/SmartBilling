import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ClientResponse, ClientRequest } from '../shared/models';
import { createInitialStore } from '../mocks/mock-data';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private store = createInitialStore();
  private subject = new BehaviorSubject<ClientResponse[]>(this.store.clients);

  getAll(): Observable<ClientResponse[]> {
    return this.subject.asObservable();
  }

  getById(id: string): Observable<ClientResponse | undefined> {
    return of(this.store.clients.find((c) => c.id === id));
  }

  create(client: ClientRequest): Observable<ClientResponse> {
    const id = 'c' + Date.now();
    const newC: ClientResponse = { ...client, id } as ClientResponse;
    this.store.clients.push(newC);
    this.subject.next(this.store.clients);
    return of(newC);
  }

  update(id: string, client: Partial<ClientResponse>): Observable<ClientResponse | undefined> {
    const idx = this.store.clients.findIndex((c) => c.id === id);
    if (idx === -1) return of(undefined);
    this.store.clients[idx] = { ...this.store.clients[idx], ...client } as ClientResponse;
    this.subject.next(this.store.clients);
    return of(this.store.clients[idx]);
  }

  delete(id: string): Observable<void> {
    this.store.clients = this.store.clients.filter((c) => c.id !== id);
    this.subject.next(this.store.clients);
    return of(undefined);
  }
}
