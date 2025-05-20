// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DbTestComponent } from './components/db-test/db-test.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'test',   component: DbTestComponent },

  { path: 'login',  component: LoginComponent },
  { path: 'inicio',  component: DbTestComponent, canActivate: [authGuard]},

  { path: '**',     redirectTo: 'login' }
];
