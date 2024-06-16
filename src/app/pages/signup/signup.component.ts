import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { SharedModule } from '../../shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SharedModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  isInProgress: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private _snackBar: MatSnackBar
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

      this.isInProgress = true;
      this.authService.signup(username, email, password).subscribe(
        response => {
          if (response.status >= 200 && response.status < 300){
            this.router.navigate(['/', 'login']);
          }
          else{
            this._snackBar.open(`An error occurred while trying to sign up (Code: ${response.status}). Please try again.`, "Ok");
          }
          this.isInProgress = false;
        }
      );
    }
  }

}
