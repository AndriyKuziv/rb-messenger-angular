import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token && isValid(token)){
    return true;
  }

  authService.removeToken();
  inject(Router).navigate(['/login']);

  return false;
};

function isValid(token: string){
  const tokenPayload = parseJwt(token);
  return tokenPayload && new Date(tokenPayload.exp * 1000) > new Date();
}

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}
