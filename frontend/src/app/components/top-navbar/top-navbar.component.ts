import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';
import { UserType } from 'src/app/enums/user-type.enum';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
  darkModeChecked: boolean;
  currentUserType: UserType;
  userTypes: typeof UserType = UserType;
  subject: BehaviorSubject<UserType> = this.roleService.getUserType();

  constructor(private router: Router, private roleService: RoleGuardService) { }

  ngOnInit() {
    this.currentUserType = this.subject.getValue();
    this.subject.subscribe(value => this.currentUserType = value);
    this.initTheme();
  }

  logIn() {
    this.router.navigate(['/login'], {});
  }

  logOut() {
    this.roleService.logout();
    this.router.navigate(['/'], {});
  }

  initTheme() {
    this.darkModeChecked = localStorage.getItem('theme') !== null && localStorage.getItem('theme') === 'dark';
    if (this.darkModeChecked) {
      document.body.classList.add('dark');

    } else {
      document.body.classList.remove('dark');
    }
  }

  resetTheme() {
    if (this.darkModeChecked) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.removeItem('theme');
    }
  }
}
