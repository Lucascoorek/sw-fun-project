import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSpinnerDialogComponent } from './progress-spinner-dialog/progress-spinner-dialog.component';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressSpinnerDialogService {
  constructor(public dialog: MatDialog) {}

  openDialog(title: string, observable: Observable<boolean>) {
    const dialogRef = this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true,
      'minHeight': '200px',
      'minWidth': '300px',
      data: {
        title,
      },
    });

    if (observable) {
      const subscription = observable?.pipe(delay(100)).subscribe({
        next: (response: boolean) => {
          if (response) {
            subscription?.unsubscribe();
            dialogRef.close();
          }
        },
        error: () => {
          subscription?.unsubscribe();
          dialogRef.close();
        },
      });
    }
  }
}
