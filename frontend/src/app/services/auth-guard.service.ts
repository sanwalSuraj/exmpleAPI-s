import { Injectable } from '@angular/core';
import { Route, Router, CanLoad, NavigationExtras, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from "rxjs";

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad {
  private staffID: number = null;
  private staffPermission = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canLoad(route: Route): boolean {
    let url = `/${route.path}`;
    return this.checkLogin(url);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    let self = this;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

  verifyRoles(): boolean {
    let roles = '';
    let currentRole: string = null;

    switch (this.staffPermission) {
      case 1: {
        currentRole = "administrator";
        break;
      }
      case 2: {
        currentRole = "staff";
        break;
      }
    }
    // console.log("roles:", roles);
    // console.log("currentRole:", currentRole);
    if (currentRole == "administrator" || roles.indexOf(currentRole) > -1) {
      return true;
    } else {
      alert("You are not allowed to access this page.")
      return false;
    }
  }

  checkLogin(url: string): boolean {
    // if (this.authService.isLoggedIn) { return this.checkNewUser(url); }
    this.authService.redirectUrl = url;
    let sessionId = localStorage.getItem('UserInfo');
    if (sessionId == null) {
      this.router.navigate(['login']);
      return false;
    }
    else {
      return true;
    }
  }
}
