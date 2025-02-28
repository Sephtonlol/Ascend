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
    path: 'exercises',
    loadComponent: () =>
      import('./exercises/exercises.page').then((m) => m.ExercisesPage),
  },
  {
    path: 'logger',
    loadComponent: () =>
      import('./logger/logger.page').then((m) => m.LoggerPage),
  },
  {
    path: 'new-workout',
    loadComponent: () =>
      import('./new-workout/new-workout.page').then((m) => m.NewWorkoutPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
