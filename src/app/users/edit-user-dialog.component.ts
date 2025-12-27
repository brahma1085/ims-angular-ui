import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { forkJoin, of } from "rxjs";
import { AdminUser } from "../models/admin-user.model";
import { UserAdminService } from "../services/user-admin.service";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@Component({
  standalone: true,
  selector: 'app-edit-user-dialog',
  imports: [
    CommonModule,
    FormsModule,            // ✅ REQUIRED for ngModel
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './edit-user-dialog.component.html'
})
export class EditUserDialogComponent {

  roles: string[] = [];
  password = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: AdminUser,
    private service: UserAdminService,
    private snack: MatSnackBar,
    private dialogRef: MatDialogRef<EditUserDialogComponent>
  ) {
    this.roles = [...user.roles];
  }

  save() {
    forkJoin([
      this.service.updateRoles(this.user.id, this.roles),
      this.password ? this.service.updatePassword(this.user.id, this.password) : of(null)
    ]).subscribe({
      next: () => {
        this.snack.open('User updated', 'Close');
        this.dialogRef.close(true);
      },
      error: () => this.snack.open('Update failed', 'Close')
    });
  }
}
