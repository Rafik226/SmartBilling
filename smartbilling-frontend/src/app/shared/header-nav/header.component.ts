import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent {
  public auth = inject(AuthService);
  private router = inject(Router);
  userSignal = this.auth.currentUser$(); // Signal<User | null>
  isAdmin = this.auth.isAdmin;

  // UI state signals
  menuOpen = signal(false);
  userMenuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  toggleUserMenu() {
    this.userMenuOpen.update(v => !v);
  }

  closeMenus() {
    this.menuOpen.set(false);
    this.userMenuOpen.set(false);
  }

  logout() {
    this.closeMenus();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
