import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, _state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const user = auth.currentUserValue;
  const roles = route.data?.['roles'] as Array<string> | undefined;
  if (!user) {
    router.navigate(['/login']);
    return false;
  }
  if (roles && roles.length > 0) {
    const userRoles = user.roles || [];
    const allowed = roles.some(r => userRoles.includes(r));
    if (!allowed) {
      router.navigate(['/']);
      return false;
    }
  }
  return true;
};
