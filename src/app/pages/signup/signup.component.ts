import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
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
  minUsernameLen = 4;
  minPasswordLen = 6;

  isInProgress: boolean = false;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.signupForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(this.minUsernameLen)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.minPasswordLen), this.passwordValidator]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup){
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const valid = hasUpperCase && hasNumber && hasSymbol;

    return valid ? null : { invalidPassword: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log("Submitted signup request");

      const username = this.signupForm.value.username;
      const password = this.signupForm.value.password;
      const email = this.signupForm.value.email;

      this.isInProgress = true;
      this._authService.signup(username, email, password).subscribe(
        response => {
          if (response.status >= 200 && response.status < 300){
            this._router.navigate(['/', 'login']);
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
