import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse{
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://rb-messenger.azurewebsites.net';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    const credentials = { username, password };
    this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
    .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      console.error('Error!', error);
      return of();
    }))
    .subscribe(
      response => {
        if(response.token){
          console.log('Login compeleted successfully');
          localStorage.setItem('token', response.token);
        }
      }
    );
  }

  signup(username: string, email: string, password: string){
    const credentials = { username, email, password };
    this.http.post(`${this.apiUrl}/auth/signup`, credentials)
    .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      console.error('Error!', error);
      return of();
    }))
    .subscribe(
      response => {
        this.router.navigate(['/', 'login'])
          .then(nav => {
            console.log('Navigation succcessful');
          }, err => {
            console.log(err);
          });
      }
    );
  }
}
