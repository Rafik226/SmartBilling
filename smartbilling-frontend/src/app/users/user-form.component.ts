import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserApiService } from '../services/user-api.service';

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
    const id = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!id;
    if (this.isEdit && id) {
      this.loading = true;
      this.userApi.getById(id).subscribe({
        next: (user) => {
          this.model = { ...user };
          this.loading = false;
        },
        error: () => { this.loading = false; }
      });
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
      this.userApi.create(this.model).subscribe({
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
