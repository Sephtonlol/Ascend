import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'statistics',
    loadComponent: () =>
      import('./statistics/statistics.page').then((m) => m.StatisticsPage),
  },
  {
    path: 'workout',
    loadComponent: () =>
      import('./workout/workout.page').then((m) => m.WorkoutPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
