import { Routes } from '@angular/router';
import { roleGuard } from './auth/role.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component')
        .then(m => m.HomeComponent)
  },

  {
    path: 'inventory',
    loadComponent: () =>
      import('./components/inventory-list/inventory-list.component')
        .then(m => m.InventoryListComponent),
    canActivate: [roleGuard('ADMIN')]
  },

  {
    path: 'orders',
    loadComponent: () =>
      import('./components/order-list/order-list.component')
        .then(m => m.OrderListComponent),
    canActivate: [roleGuard('ADMIN')]
  },

  {
    path: 'customers',
    loadComponent: () =>
      import('./components/customer-list/customer-list.component')
        .then(m => m.CustomerListComponent),
    canActivate: [roleGuard('USER')]
  },

  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./error/unauthorized/unauthorized.component')
        .then(m => m.UnauthorizedComponent)
  },
  
  {
      path: 'forbidden',
      loadComponent: () =>
        import('./error/forbidden/forbidden.component')
          .then(m => m.ForbiddenComponent)
    },
    {
      path: 'users',
      loadComponent: () =>
        import('./users/users-list.component')
          .then(m => m.UsersListComponent),
      canActivate: [roleGuard('ADMIN')]
    },

  { path: '**', redirectTo: 'home' }
];
