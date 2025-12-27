import { Component, Inject } from '@angular/core';
import { InventoryItem } from '../../../models/inventory.model';
import { InventoryService } from '../../../services/inventory.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@Component({
	selector: 'app-inventory-form-dialog',
	imports: [ReactiveFormsModule, MatInputModule, MatSelectModule,
		MatSnackBarModule, MatPaginatorModule, MatSortModule,
		MatFormFieldModule, MatToolbarModule, MatDialogModule,
		MatTableModule, MatButtonModule, MatIconModule, MatCardModule],
	templateUrl: './inventory-form-dialog.component.html',
	styleUrl: './inventory-form-dialog.component.scss',
})

export class InventoryFormDialogComponent {

	form: FormGroup;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: InventoryItem | null,
		private fb: FormBuilder,
		private inventoryService: InventoryService,
		public dialogRef: MatDialogRef<InventoryFormDialogComponent>
	) {
		this.form = this.fb.group({
			name: [data?.name || '', Validators.required],
			price: [data?.price || 0, Validators.required],
			stock: [data?.stock || 0, Validators.required]
		});
	}

	save() {
		if (this.form.invalid) return;

		const request = this.data
			? this.inventoryService.update(this.data.id!, this.form.value)
			: this.inventoryService.create(this.form.value);

		request.subscribe(() => this.dialogRef.close(true));
	}
}
