import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
  loggedIn = true;

  constructor() { }

  ngOnInit() {
  }

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }
}
