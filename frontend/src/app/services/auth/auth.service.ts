import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

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
