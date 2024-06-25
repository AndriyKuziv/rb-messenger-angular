import type { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { NotificationService } from '../services/notification/notification.service';

export const notificationErrInterceptor: HttpInterceptorFn = (req, next) => {
  const noficitaionService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      noficitaionService.openSnackBar(error.message, "err", "Ok");
      return of();
    })
  );
};
