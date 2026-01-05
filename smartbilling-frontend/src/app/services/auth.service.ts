// Service désactivé pour éviter conflit avec le AuthService JWT réel
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
// import { User } from '../shared/models';
// import { createInitialStore } from '../mocks/mock-data';

// const { users: MOCK_USERS } = createInitialStore();

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private currentUserSubject = new BehaviorSubject<User | null>(null);

//   constructor() {
//     const raw = localStorage.getItem('sb_current_user');
//     if (raw) {
//       this.currentUserSubject.next(JSON.parse(raw));
//     }
//   }

//   currentUser$(): Observable<User | null> {
//     return this.currentUserSubject.asObservable();
//   }

//   get currentUserValue(): User | null {
//     return this.currentUserSubject.value;
//   }

//   login(username: string, _password?: string): Observable<User> {
//     // mock: ignore password, find by username
//     const u = MOCK_USERS.find((x) => x.username === username);
//     if (!u) {
//       return throwError(() => new Error('Utilisateur non trouvé'));
//     }
//     const user = { ...u, token: 'fake-jwt-' + u.username } as User;
//     this.currentUserSubject.next(user);
//     localStorage.setItem('sb_current_user', JSON.stringify(user));
//     return of(user);
//   }

//   logout(): void {
//     this.currentUserSubject.next(null);
//     localStorage.removeItem('sb_current_user');
//   }

//   hasRole(role: string): boolean {
//     const u = this.currentUserSubject.value;
//     if (!u) return false;
//     return (u.roles || []).includes(role) || (role === 'user' && (u.roles || []).includes('admin'));
//   }
// }
