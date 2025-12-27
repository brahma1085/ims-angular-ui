import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>
      {{ data?.stock ? 'Edit Stock' : 'Add Stock' }}
    </h2>

    <form [formGroup]="form" (ngSubmit)="save()">
      <mat-form-field appearance="outline" class="w-100">
        <mat-label>SKU Code</mat-label>
        <input matInput formControlName="skuCode">
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-100">
        <mat-label>Quantity</mat-label>
        <input matInput type="number" formControlName="quantity">
      </mat-form-field>

      <div align="end">
        <button mat-button mat-dialog-close>Cancel</button>
        <button mat-raised-button color="primary" type="submit">
          Save
        </button>
      </div>
    </form>
  `
})
export class StockFormDialogComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StockFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // ✅ FormBuilder is now available
    this.form = this.fb.group({
      skuCode: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]]
    });

    // ✅ Patch values for EDIT
    if (data?.stock) {
      this.form.patchValue(data.stock);
    }
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
