import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  user: any = {
    username: 'admin',
    email: 'admin@mail.com',
    roles: ['admin'],
    status: 'actif'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  back() {
    this.router.navigate(['/users']);
  }
  edit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/users', id, 'edit']);
  }
}
