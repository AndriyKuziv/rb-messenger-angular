import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, NavigationStart } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoggingIn: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Submitted login request");
      this.isLoggingIn = true;

      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this._authService.login(username, password).subscribe(
        response => {
          this._router.navigate(['/users-list']);
        }
      );

      this.isLoggingIn = false;
    }
  }
}
