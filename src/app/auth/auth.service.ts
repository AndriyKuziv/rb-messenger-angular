import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, catchError, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';
import { LoginResponse } from '../shared/models/loginResponse'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _tokenName = "token";
  private _apiUrl = 'https://rb-messenger.azurewebsites.net';

  private _authStateSubject = new BehaviorSubject<boolean>(this.hasToken());
  authStatus$: Observable<boolean> = this._authStateSubject.asObservable();

  constructor(private _http: HttpClient) {}

  login(username: string, password: string): Observable<HttpResponse<LoginResponse>> {
    const credentials = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'skip': 'true' });

    return this._http.post<LoginResponse>(`${this._apiUrl}/auth/login`, credentials,
      {
        headers,
        observe: 'response'
      }
    )
    .pipe(
      map(response => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error!', error);
        return of(new HttpResponse<any>({
          body: error.error,
          status: error.status,
          statusText: error.statusText,
          headers: error.headers
        }));
      })
    );
  }

  logout(){
    this.removeToken();
    console.log("Removed the token");
  }

  signup(username: string, email: string, password: string): Observable<HttpResponse<any>>{
    const credentials = { username, email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'skip': 'true' });

    return this._http.post(`${this._apiUrl}/auth/signup`, credentials, { headers, observe: 'response' })
    .pipe(
      map(response => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error!', error);
        return of(new HttpResponse<any>({
          body: error.error,
          status: error.status,
          statusText: error.statusText,
          headers: error.headers
        }));
      })
    );
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this._tokenName);
  }

  getToken(){
    return localStorage.getItem(this._tokenName);
  }

  setToken(token: string) {
    localStorage.setItem(this._tokenName, token);
    this._authStateSubject.next(true);
  }

  removeToken() {
    localStorage.removeItem(this._tokenName);
    this._authStateSubject.next(false);
  }
}
