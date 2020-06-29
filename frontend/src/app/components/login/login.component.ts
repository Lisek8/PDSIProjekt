import { Component, OnInit } from '@angular/core';
import { RoleGuardService } from 'src/app/services/role-guard/role-guard.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  loginButtonDisabled: boolean;
  usernameFieldDisabled: boolean;
  passwordFieldDisabled: boolean;

  displayError: boolean;

  constructor(private loginService: RoleGuardService, private router: Router, private toastService: ToastrService) { }

  ngOnInit() {
    this.username = '';
    this.password = '';
    this.disableForm(false);
    this.displayError = false;
  }

  async login() {
    this.disableForm(true);
    await this.loginService.login(this.username, this.password).toPromise().then(
      res => this.router.navigate(['/']),
      err => {
        if (err.status === 401) {
          this.displayError = true;
        } else {
          this.displayError = false;
          this.toastService.error('Wystąpił błąd podczas próby logowania');
        }
        this.disableForm(false);
        this.password = '';
      }
    );
  }

  private disableForm(disable: boolean) {
    this.loginButtonDisabled = disable;
    this.usernameFieldDisabled = disable;
    this.passwordFieldDisabled = disable;
  }

}
