import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientListComponent } from './clients/client-list.component';
import { ClientFormComponent } from './clients/client-form.component';
import { ClientDetailComponent } from './clients/client-detail.component';
import { InvoiceListComponent } from './invoices/invoice-list.component';
import { InvoiceFormComponent } from './invoices/invoice-form.component';
import { InvoiceDetailComponent } from './invoices/invoice-detail.component';
import { LoginComponent } from './auth/login.component';
import { PaymentListComponent } from './payments/payment-list.component';
import { PaymentFormComponent } from './payments/payment-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

  // clients
  { path: 'clients', component: ClientListComponent, canActivate: [authGuard] },
  { path: 'clients/new', component: ClientFormComponent, canActivate: [authGuard] },
  { path: 'clients/:id/edit', component: ClientFormComponent, canActivate: [authGuard] },
  { path: 'clients/:id', component: ClientDetailComponent, canActivate: [authGuard] },

  // invoices
  { path: 'invoices', component: InvoiceListComponent, canActivate: [authGuard] },
  { path: 'invoices/new', component: InvoiceFormComponent, canActivate: [authGuard] },
  { path: 'invoices/:id/edit', component: InvoiceFormComponent, canActivate: [authGuard] },
  { path: 'invoices/:id', component: InvoiceDetailComponent, canActivate: [authGuard] },

  // payments
  { path: 'payments', component: PaymentListComponent, canActivate: [authGuard] },
  { path: 'payments/new', component: PaymentFormComponent, canActivate: [authGuard] },

  // users
  { path: 'users', loadComponent: () => import('./users/user-list.component').then(m => m.UserListComponent) },
  { path: 'users/new', loadComponent: () => import('./users/user-form.component').then(m => m.UserFormComponent) },
  { path: 'users/:id/edit', loadComponent: () => import('./users/user-form.component').then(m => m.UserFormComponent) },
  { path: 'users/:id', loadComponent: () => import('./users/user-detail.component').then(m => m.UserDetailComponent) },
];
