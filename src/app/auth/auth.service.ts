import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, catchError, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs';
import { LoginResponse } from '../shared/models/loginResponse'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenName = "token";
  private apiUrl = 'https://rb-messenger.azurewebsites.net';

  private authStateSubject = new BehaviorSubject<boolean>(this.hasToken());
  authStatus: Observable<boolean> = this.authStateSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<HttpResponse<LoginResponse>> {
    const credentials = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials,
      {
        headers,
        observe: 'response'
      }
    )
    .pipe(
      map(response => {        
        return response;
      }),
      catchError((error: any, caught: Observable<any>): Observable<any> => {
        console.error('Error!', error);
        
        return of(new HttpResponse<LoginResponse>({ body: {} as LoginResponse, status: 500}));
    })
    );
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenName);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenName, token);
    this.authStateSubject.next(true);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenName);
    this.authStateSubject.next(false);
  }
}
