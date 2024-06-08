import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-progress-spinner-dialog',
  standalone: true,
  imports: [MaterialModule],
  template: ` <h4 mat-dialog-title>{{ data.title }}</h4>
    <mat-dialog-content class="dialog-content">
      <mat-spinner [diameter]="32"></mat-spinner>
    </mat-dialog-content>`,
  styleUrl: './progress-spinner-dialog.component.scss',
})
export class ProgressSpinnerDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string }) {}
}
