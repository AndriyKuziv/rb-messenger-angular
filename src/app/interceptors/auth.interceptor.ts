import type { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../services/notification/notification.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  if(req.headers.get('skip')){
    return next(req);
  }

  const authService = inject(AuthService);

  const token = authService.getToken();
  const jwtHelper = new JwtHelperService();

  if(token && !jwtHelper.isTokenExpired(token)){
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }
  else{
    notificationService.openSnackBar("Error! Token is expired or does not exist.", "err", "Ok");
    authService.logout();

    const router = inject(Router);
    router.navigate(['/login']);

    return of();
  }

  return next(req);
};
