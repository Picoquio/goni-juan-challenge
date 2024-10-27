import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';

export const routes: Routes = [
  {
    canActivate: [isNotAuthenticatedGuard],
    path: 'login',
    loadComponent: () => import('./auth/login.component'),
    title: 'Login'
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    title: 'Home Page',
    canActivate: [isAuthenticatedGuard],
    // canMatch: [CanMatchGuard],
    children: [
      {
        path: `users`,
        loadComponent: () => import('./pages/users/users.component'),
        title: 'Users'
      }
    ]
  }
];
