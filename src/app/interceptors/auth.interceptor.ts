import type { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();

  if(token){
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
  }
  else{
    console.error("Error! Token does not exist.");
  }

  return next(req);
};
