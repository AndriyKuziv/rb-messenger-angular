import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, of } from 'rxjs';

interface LoginResponse{
  token?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  private apiUrl = 'https://rb-messenger.azurewebsites.net';

  constructor(private fb: FormBuilder, private authService: AuthService, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Submitted login request");

      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.login(username, password);
    }
  }

  login(username: string, password: string) {
    const credentials = { username, password };
    this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials)
    .pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
      console.error('Error!', error);
      alert("An error occurred while trying to log in. Please try again.");
      return of();
    }))
    .subscribe(
      response => {
        if(response.token){
          console.log('Login compeleted successfully');
          this.authService.setToken(response.token);
          this.router.navigate(['/userslist']);
        }
      }
    );
  }
}
