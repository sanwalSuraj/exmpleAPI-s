import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { ResetpasswordComponent } from './auth/resetpassword/resetpassword.component';




export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
  },
  {
    path: '',
    loadChildren: 'app/theme/theme.module#ThemeModule',
    canActivate: [AuthGuard]
  }
  // {
  //   path: '**',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true }), HttpModule],
  exports: [RouterModule, HttpModule]
})
export class AppRoutingModule { }
