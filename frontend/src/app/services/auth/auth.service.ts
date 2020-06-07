import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private router: Router) { }

clear(): void {
  localStorage.clear();
}

isAuthenticated(): boolean {
  return localStorage != null && !this.isTokenExpired();
}

isTokenExpired(): boolean {
  return false;
}

logout(): void {
  this.clear();
  // navigation
}

}
