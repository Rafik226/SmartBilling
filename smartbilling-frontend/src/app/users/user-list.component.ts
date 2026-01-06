import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  search = '';
  page = 1;
  pageSize = 5;
  loading = false;

  constructor(private router: Router, private userApi: UserApiService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.userApi.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  get filteredUsers(): User[] {
    const q = this.search.trim().toLowerCase();
    let res = this.users;
    if (q) {
      res = res.filter(u => u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    }
    return res;
  }

  get pagedUsers(): User[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize) || 1;
  }

  view(id: number) {
    this.router.navigate(['/users', id]);
  }
  edit(id: number) {
    this.router.navigate(['/users', id, 'edit']);
  }
  create() {
    this.router.navigate(['/users', 'new']);
  }
  delete(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
      this.userApi.delete(id).subscribe(() => {
        this.fetchUsers();
        if (this.pagedUsers.length === 0 && this.page > 1) {
          this.page--;
        }
      });
    }
  }
  setPage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
    }
  }
}
