import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserType } from 'src/app/enums/user-type.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  currentUserType: UserType = UserType.User;
  routesActivationArray = [
    {
      path: 'personal',
      forRoles: [UserType.Lecturer, UserType.User, UserType.Admin]
    },
    {
      path: 'topicview/:id',
      forRoles: [UserType.Lecturer, UserType.User, UserType.Admin]
    },
    {
      path: 'conversations',
      forRoles: [UserType.Lecturer, UserType.User]
    },
    {
      path: 'dashboard',
      forRoles: [UserType.Lecturer]
    },
    {
      path: 'login',
      forRoles: [UserType.Guest]
    }
  ];

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let found = false;
    this.routesActivationArray.forEach(routeToCheck => {
      if (routeToCheck.path === route.routeConfig.path && routeToCheck.forRoles.includes(this.currentUserType)) {
        found = true;
      }
    });
    if (found) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

  getUserType(): UserType {
    return this.currentUserType;
  }

  resetUserType(): void {
    this.currentUserType = UserType.Guest;
  }

}
