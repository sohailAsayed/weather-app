import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  template: `
    <div [ngClass]="data.panelClass">
      {{ data.message }}
    </div>
  `,
  styles: [
    `
      .success-snackbar {
        background-color: #4caf50;
        color: white;
        padding: 16px;
      }

      .error-snackbar {
        background-color: #f44336;
        color: white;
        padding: 16px;
      }

      .warning-snackbar {
        background-color: #ffeb3b;
        color: black;
        padding: 16px;
      }

      .info-snackbar {
        background-color: #2196f3;
        color: white;
        padding: 16px;
      }
    `,
  ],
  standalone: false,
})
export class CustomSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
