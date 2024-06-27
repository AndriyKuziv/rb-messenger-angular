import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserslistComponent } from './pages/userslist/users-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/users-list', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'users-list', component: UserslistComponent, canActivate: [authGuard] }
];
