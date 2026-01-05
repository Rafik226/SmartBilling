import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../shared/models';
import { createInitialStore } from '../mocks/mock-data';

@Injectable({ providedIn: 'root' })
export class UserService {
  private store = createInitialStore();
  private subject = new BehaviorSubject<User[]>(this.store.users);

  getAll(): Observable<User[]> {
    return this.subject.asObservable();
  }

  getByUsername(username: string): Observable<User | undefined> {
    return of(this.store.users.find((u) => u.username === username));
  }

  create(user: Partial<User>): Observable<User> {
    const newU: User = { username: user.username || `user${Date.now()}`, roles: user.roles || ['user'] } as User;
    this.store.users.push(newU);
    this.subject.next(this.store.users);
    return of(newU);
  }

  update(username: string, user: Partial<User>): Observable<User | undefined> {
    const idx = this.store.users.findIndex((u) => u.username === username);
    if (idx === -1) return of(undefined);
    this.store.users[idx] = { ...this.store.users[idx], ...user } as User;
    this.subject.next(this.store.users);
    return of(this.store.users[idx]);
  }

  delete(username: string): Observable<void> {
    this.store.users = this.store.users.filter((u) => u.username !== username);
    this.subject.next(this.store.users);
    return of(undefined);
  }
}
