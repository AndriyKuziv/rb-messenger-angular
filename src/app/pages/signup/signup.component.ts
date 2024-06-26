import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  private apiUrl = 'https://rb-messenger.azurewebsites.net';

  constructor(private fb: FormBuilder, private authService: AuthService,
    private http: HttpClient, private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log("Submitted signup request");
      console.log(this.signupForm.value);
      
      const password = this.signupForm.value.password;
      const repPassword = this.signupForm.value.repPassword;
      if (password != repPassword){
        console.error('Passwords do not match');
        return;
      }

      const username = this.signupForm.value.username;
      const email = this.signupForm.value.email;

      this.signup(username, email, password);
    }
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
