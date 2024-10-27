import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login.component'),
    title: 'Login'
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component'),
    title: 'Home Page',
    children: [
      {
        path: `users`,
        loadComponent: () => import('./pages/users/users.component'),
        title: 'Users'
      }
    ]
  }
];
