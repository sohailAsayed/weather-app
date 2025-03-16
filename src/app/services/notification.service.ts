import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../components/notification/custom-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  private showNotification(
    message: string,
    panelClass: string,
    duration: number = 2500
  ): void {
    const config: MatSnackBarConfig = {
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      data: { message, panelClass },
      panelClass: 'custom-snackbar-panel',
    };

    this.snackBar.openFromComponent(CustomSnackbarComponent, config);
  }

  success(message: string, duration?: number): void {
    this.showNotification(message, 'success-snackbar', duration);
  }

  error(message: string, duration?: number): void {
    this.showNotification(message, 'error-snackbar', duration);
  }

  warning(message: string, duration?: number): void {
    this.showNotification(message, 'warning-snackbar', duration);
  }

  info(message: string, duration?: number): void {
    this.showNotification(message, 'info-snackbar', duration);
  }
}
