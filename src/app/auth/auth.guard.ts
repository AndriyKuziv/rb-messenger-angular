import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt'

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  const jwtHelper = new JwtHelperService();

  if (token && !jwtHelper.isTokenExpired(token)){
    return true;
  }

  authService.removeToken();
  inject(Router).navigate(['/login']);

  return false;
};
