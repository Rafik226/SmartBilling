import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientFormComponent } from './client-form/client-form.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClientListComponent, ClientFormComponent],
  imports: [CommonModule, FormsModule],
  exports: [ClientListComponent, ClientFormComponent]
})
export class ClientsModule {}
