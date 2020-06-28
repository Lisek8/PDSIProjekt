import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserType } from 'src/app/enums/user-type.enum';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  currentUserType: UserType = UserType.Lecturer;
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

  constructor(private router: Router, private http: HttpClient) { }

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

  async login(username: string, password: string) {
    return this.http.post(environment.restServicesPath + 'login?username=' + username + '&password=' + password, {});
  }

  getUserType() {
    // this.http.get(environment.restServicesPath + 'user', {})
    //   .subscribe((value: string) => {
    //     this.currentUserType = UserType[value];
    //   });
    return this.currentUserType;
  }

  resetUserType(): void {
    this.currentUserType = UserType.Guest;
  }

  logout(): void {
    this.http.post(environment.restServicesPath + 'logout', {});
  }

}
