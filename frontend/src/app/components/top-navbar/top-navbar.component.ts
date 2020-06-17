import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';
import { UserType } from 'src/app/enums/user-type.enum';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  currentUserType: UserType;
  userTypes: typeof UserType = UserType;

  constructor(private router: Router, private roleService: RoleGuardService) { }

  ngOnInit() {
    this.currentUserType = this.roleService.getUserType();
  }

  logIn() {
    this.router.navigate(['/login'], {});
  }

  logOut() {
    this.roleService.resetUserType();
    this.currentUserType = this.roleService.getUserType();
    this.router.navigate(['/'], {});
  }
}
