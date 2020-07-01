import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { UserType } from 'src/app/enums/user-type.enum';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

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

  constructor(private router: Router, private http: HttpClient, private toastService: ToastrService) { }

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

  login(username: string, password: string) {
    return this.http.post(environment.restServicesPath + 'login?username=' + username + '&password=' + password, {});
  }

  async getUserTypeFromBackend() {
    this.http.get(environment.restServicesPath + 'user', {})
    .subscribe((value: UserType) => this.currentUser.next(value));
  }

  getUserType(): BehaviorSubject<UserType> {
    this.getUserTypeFromBackend();
    return this.currentUser;
  }

  logout() {
    this.http.post(environment.restServicesPath + 'logout', {}).pipe(
      catchError(err => {
        this.toastService.error('Wystąpił błąd podczas wylogowywania', 'Błąd');
        return throwError(err);
      })
    ).subscribe(value => {
      this.toastService.success('Pomyślnie wylogowano', 'Sukces');
      this.currentUser.next(UserType.Guest);
    });
  }

}
