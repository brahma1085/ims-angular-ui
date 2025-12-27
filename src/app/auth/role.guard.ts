import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from './keycloak.service';

export const roleGuard = (requiredRole: string): CanActivateFn => {
  return async () => {
    const kc = inject(KeycloakService);
    const router = inject(Router);

    // ✅ Ensure Keycloak ready
    if (!kc.isInitialized()) {
      await kc.waitUntilInitialized();
    }

    // ✅ Not logged in → go to login
    if (!kc.isLoggedIn()) {
      kc.login();
      return false;
    }

    const roles = kc.getUserRoles();
    console.log('User roles:', roles, 'Required:', requiredRole);

    // ✅ Authorized
    if (roles.includes(requiredRole)) {
      return true;
    }

    // ❌ Unauthorized
    router.navigateByUrl('/unauthorized');
    return false;
  };
};
