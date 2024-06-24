import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).getToken()){
    return true;
  }

  inject(Router).navigate(['/login']);

  return false;
};
