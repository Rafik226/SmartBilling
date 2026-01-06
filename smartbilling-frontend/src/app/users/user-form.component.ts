import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { User, UserCreateDto } from '../shared/models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  model: any = { roles: [] };
  isEdit = false;
  loading = false;
  error = '';

  constructor(private router: Router, private route: ActivatedRoute, private userApi: UserApiService) {}

  ngOnInit(): void {
    const idStr = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!idStr;
    if (this.isEdit && idStr) {
      this.loading = true;
      const id = +idStr;
      this.userApi.getById(id).subscribe({
        next: (user) => {
          this.model = { ...user };
          // Ensure roles is an array
          if (!this.model.roles) {
            this.model.roles = [];
          }
          this.loading = false;
        },
        error: () => { this.loading = false; }
      });
    } else {
      // Initialize for create
      this.model = {
        username: '',
        password: '',
        fullName: '',
        email: '',
        roles: ['ROLE_USER'] // Default role
      };
    }
  }

  save() {
    this.loading = true;
    this.error = '';
    if (this.isEdit) {
      this.userApi.update(this.model.id, this.model).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message || 'Erreur lors de la modification.';
        }
      });
    } else {
      const createUser: UserCreateDto = {
        username: this.model.username,
        password: this.model.password,
        fullName: this.model.fullName,
        email: this.model.email,
        roles: this.model.roles
      };
      this.userApi.create(createUser).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/users']);
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message || 'Erreur lors de la création.';
        }
      });
    }
  }
  cancel() {
    this.router.navigate(['/users']);
  }
}
