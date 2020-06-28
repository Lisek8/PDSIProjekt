import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserType } from 'src/app/enums/user-type.enum';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  currentUser: BehaviorSubject<UserType> = new BehaviorSubject<UserType>(UserType.Guest);
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
      if (routeToCheck.path === route.routeConfig.path && routeToCheck.forRoles.includes(this.currentUser.getValue())) {
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
    await this.http.post(environment.restServicesPath + 'login?username=' + username + '&password=' + password, {}).subscribe();
    console.warn('1st checkpoint');
    await this.getUserTypeFromBackend();
    console.warn('2nd checkpoint');
  }

  async getUserTypeFromBackend() {
    this.http.get(environment.restServicesPath + 'user', {})
    .pipe(
      tap(value => console.log('getUserTypeFromBackend: ' + value))
    )
    .subscribe((value: UserType) => this.currentUser.next(value));
  }

  getUserType(): BehaviorSubject<UserType> {
    this.getUserTypeFromBackend();
    return this.currentUser;
  }

  async logout() {
    await this.http.post(environment.restServicesPath + 'logout', {}).subscribe();
    this.getUserTypeFromBackend();
  }

}
