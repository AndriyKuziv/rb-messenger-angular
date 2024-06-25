import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from './../../environments/environment';
import { localStorageConstant } from '../shared/constants/local-storage.constant';
import { LoginResponse } from '../shared/interfaces/responses/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authStateSubject = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$: Observable<boolean> = this._authStateSubject.asObservable();

  constructor(private _http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    const credentials = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'skip': 'true' });

    return this._http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials, { headers })
      .pipe(tap(response => this.setToken(response?.token)));
  }

  logout(){
    this.removeToken();
  }

  signup(username: string, email: string, password: string): Observable<any>{
    const credentials = { username, email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'skip': 'true' });

    return this._http.post(`${environment.apiUrl}/auth/signup`, credentials, { headers });
  }

  getToken(){
    return localStorage.getItem(localStorageConstant.tokenName);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(localStorageConstant.tokenName);
  }

  private setToken(token: string | undefined) {
    if (token){
      localStorage.setItem(localStorageConstant.tokenName, token);
      this._authStateSubject.next(true);
    }
    else {
      console.error("Error! Token is undefined.");
    }
  }

  private removeToken() {
    localStorage.removeItem(localStorageConstant.tokenName);
    this._authStateSubject.next(false);
  }
}
