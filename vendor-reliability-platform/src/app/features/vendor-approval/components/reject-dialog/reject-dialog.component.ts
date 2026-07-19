import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reject-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './reject-dialog.component.html',
  styleUrls: ['./reject-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RejectDialogComponent {

  readonly dialogRef = inject(MatDialogRef<RejectDialogComponent>);

  readonly data = inject(MAT_DIALOG_DATA);

  private fb = inject(FormBuilder);

  readonly maxLength = 500;

  readonly form = this.fb.group({

    reason: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(this.maxLength)
      ]
    ]

  });

  submit(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();
      return;

    }

    this.dialogRef.close({
      confirmed: true,
      reason: this.form.value.reason
    });

  }

  cancel(): void {

    this.dialogRef.close({
      confirmed: false
    });

  }

}