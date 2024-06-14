import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { MatDividerModule } from '@angular/material/divider'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    authService.authStatus.subscribe((isAuthenticated: boolean) => {
      console.log(isAuthenticated);
      this.isAuthenticated = isAuthenticated;
    })
  }

  logout(){
    this.authService.removeToken();
    console.log("Called removal of the token");
    this.router.navigate(['/login']);
  }
}
