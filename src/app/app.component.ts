import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isAuthenticated: boolean = false;

  constructor(private _authService: AuthService, private _router: Router) {
    _authService.authStatus$.subscribe((isAuthenticated: boolean) => {
      this.isAuthenticated = isAuthenticated;
    })
  }

  logout(){
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
