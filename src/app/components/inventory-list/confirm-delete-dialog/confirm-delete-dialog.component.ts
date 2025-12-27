import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogRef,
	MatDialogModule
} from '@angular/material/dialog';

import { InventoryService } from '../../../services/inventory.service';
import { InventoryItem } from '../../../models/inventory.model';

@Component({
	standalone: true,
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule
	],
	template: `
    <h2 mat-dialog-title>Confirm</h2>
    <mat-dialog-content>Delete item?</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>No</button>
      <button mat-raised-button color="warn" (click)="delete()">Yes</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: InventoryItem,   // ✅ FIX
		private inventoryService: InventoryService,
		private dialogRef: MatDialogRef<ConfirmDialogComponent>
	) { }

	delete(): void {
		if (!this.data?.id) return;

		this.inventoryService.delete(this.data.id).subscribe(() => {
			this.dialogRef.close(true);
		});
	}
}
