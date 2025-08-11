import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home-page/home-page'),
  },
  {
    path: 'game',
    loadComponent: () => import('./pages/game-page/game-page'),
  },
  {
    path: 'hall-of-fame',
    loadComponent: () => import('./pages/hall-of-fame-page/hall-of-fame-page'),
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings-page/settings-page'),
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
