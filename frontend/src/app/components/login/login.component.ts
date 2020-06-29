import { Component, OnInit } from '@angular/core';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private loginService: RoleGuardService) { }

  ngOnInit() {
    this.username = '';
    this.password = '';
  }

  login() {
    this.loginService.login(this.username, this.password);
  }

}
