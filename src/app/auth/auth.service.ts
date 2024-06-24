import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, catchError, of, BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';
import { localStorageConstant } from '../shared/constants/local-storage.constant';
import { LoginResponse } from '../shared/models/responses/loginResponse';

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

    return this._http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials,
      {
        headers
      }
    )
    .pipe(response => {
        return response;
      }
    );
  }

  logout(){
    this.removeToken();
  }

  signup(username: string, email: string, password: string): Observable<HttpResponse<any>>{
    const credentials = { username, email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'skip': 'true' });

    return this._http.post(`${environment.apiUrl}/auth/signup`, credentials,
      {
        headers,
        observe: 'response'
      })
    .pipe(response => {
        return response;
      }
    );
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(localStorageConstant.tokenName);
  }

  getToken(){
    return localStorage.getItem(localStorageConstant.tokenName);
  }

  setToken(token: string) {
    localStorage.setItem(localStorageConstant.tokenName, token);
    this._authStateSubject.next(true);
  }

  removeToken() {
    localStorage.removeItem(localStorageConstant.tokenName);
    this._authStateSubject.next(false);
  }
}
