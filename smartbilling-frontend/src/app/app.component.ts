import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/">Dashboard</a> |
      <a routerLink="/clients">Clients</a> |
      <a routerLink="/invoices">Factures</a> |
      <a routerLink="/login">Connexion</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
