import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'signup',
    loadComponent: () => import('./features/auth/signup-page/signup-page').then(m => m.SignupPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login-page/login-page').then(m => m.LoginPage)
  },
  {
    path: 'search',
    loadComponent: () => import('./features/search/job-list-page/job-list-page').then(m => m.JobListPage)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./features/favorites/favorites-page/favorites-page').then(m => m.FavoritesPage),
    canActivate: [authGuard]
  },
  {
    path: 'applications',
    loadComponent: () => import('./features/applications/applications-page/applications-page').then(m => m.ApplicationsPage),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile-page/profile-page').then(m => m.ProfilePage),
    canActivate: [authGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home-page/home-page').then(m => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
