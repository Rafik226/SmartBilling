import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthRequest, AuthResponse } from '../shared/models/auth.model';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.loading = true;
    const req: AuthRequest = { username: this.username, password: this.password };
    this.auth.login(req)
      .pipe(timeout(10000))
      .subscribe({
        next: (res: AuthResponse) => {
          this.loading = false;
          if (res && res.token) {
            this.auth.saveToken(res.token);
            this.router.navigate(['/dashboard']).then(success => {
              if (!success) {
                this.error = 'Redirection vers le dashboard impossible.';
              }
            });
          } else {
            this.error = 'Identifiants invalides ou réponse vide.';
          }
        },
        error: (err) => {
          this.loading = false;
          if (err?.name === 'TimeoutError') {
            this.error = 'Le serveur ne répond pas (timeout).';
          } else if (err?.status === 0) {
            this.error = 'Impossible de contacter le serveur. Vérifiez que le backend est démarré et que CORS est autorisé.';
          } else {
            this.error = err?.error?.message || 'Erreur de connexion';
          }
        }
      });
  }
}
