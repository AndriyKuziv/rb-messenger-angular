import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SharedModule } from '../../shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isInProgress: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Submitted login request");
      this.isInProgress = true;

      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      this.authService.login(username, password).subscribe(
        response => {
          if(response.body && response.body.token){
            this.authService.setToken(response.body.token);

            this.router.navigate(['/userslist']);
          }
          else{
            this._snackBar.open(`An error occurred while trying to log in (Code: ${response.status}). Please try again.`, "Ok");
          }
          this.isInProgress = false;
        }
      );
    }
  }

}
