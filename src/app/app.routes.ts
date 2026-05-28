import { Routes } from '@angular/router';
import { NotFound } from './platform/utils/exception-handling/not-found';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/app-layout')
        .then(m => m.AppLayout),
    children: [
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./modules/auth/pages/login')
            .then(m => m.Login)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./modules/auth/pages/register')
            .then(m => m.Register)
      },
      {
        path: 'landing',
        loadComponent: () =>
          import('./modules/landing/pages/landing')
            .then(m => m.Landing)
      },
      {
        path: '**',
        component: NotFound,
        pathMatch: 'full'
      },
    ]
  }
];