import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, state: "success" | "err" | "warn", action = "", config? : MatSnackBarConfig) {
    const snackBarConfig: MatSnackBarConfig = {
      duration: 3000,
      panelClass: `${state}-snack-bar-panel`
    }

    this._snackBar.open(message, action, config || snackBarConfig);
  }
}
