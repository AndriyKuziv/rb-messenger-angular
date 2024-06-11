import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenName = "token";
  private authStateSubject = new BehaviorSubject<boolean>(this.hasToken());
  authStatus: Observable<boolean> = this.authStateSubject.asObservable();

  constructor() {}

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
