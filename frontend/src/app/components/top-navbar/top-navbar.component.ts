import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {
  loggedIn = true;
  darkModeChecked: boolean;

  constructor() { }

  ngOnInit() {
    this.initTheme();
  }

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
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
