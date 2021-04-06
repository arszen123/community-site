import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

export type Credentials = { username: string, password: string};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    this._checkTokenValidity();
  }

  authenticate(credentials: Credentials) {
    return this.http.post(environment.api + '/auth/sign-in', credentials)
    .pipe(tap(({access_token}: any) => {
      this.setToken(access_token);
    }))
  }
  signUp(credentials: Credentials) {
    return this.http.post(environment.api + '/auth/sign-up', credentials)
    .pipe(tap(({access_token}: any) => {
      this.setToken(access_token);
    }))
  }

  private setToken(token: string) {
    // 8 hour while, the token is valid. The API should return it.
    const timestamp = new Date(new Date().getTime() + 1000 * 60 * 60 * 8);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('timestamp', timestamp.getTime().toString());
  }

  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('timestamp');
  }

  private _checkTokenValidity() {
    if (!this._isTokenValid()) {
      this.logout();
    }
  }

  private _isTokenValid() {
    const now = new Date().getTime();
    const expTime = this.getTokenExpirationTime();
    return !(Number.isNaN(expTime) || now > expTime)
  }

  private getTokenExpirationTime() {
    return Number.parseInt(localStorage.getItem('timestamp'));
  }
}
