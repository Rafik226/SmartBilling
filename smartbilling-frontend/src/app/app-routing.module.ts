import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'invoices', component: InvoiceListComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
