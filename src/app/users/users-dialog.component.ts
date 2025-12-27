import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { UserAdminService } from '../services/user-admin.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
	standalone: true,
	selector: 'app-users-dialog',
	templateUrl: './users-dialog.component.html',
	imports: [
		CommonModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,   // ✅ REQUIRED for mat-option
		MatButtonModule, MatDialogModule, MatIconModule
	]
})
export class UsersDialogComponent {

	username = '';
	password = '';
	roles: string[] = ['USER'];

	constructor(
		private dialogRef: MatDialogRef<UsersDialogComponent>,
		private userAdmin: UserAdminService
	) { }

	users: any[] = [];

	ngOnInit() {
		this.loadUsers();
	}

	loadUsers() {
		this.userAdmin.getUsers().subscribe(users => this.users = users);
	}


	createUser() {
	this.userAdmin.createUser({
		username: this.username,
		password: this.password,
		roles: this.roles
	}).subscribe({
		next: () => {
			this.dialogRef.close(true); // ✅ IMPORTANT
		},
			error: () => alert('Failed to create user')
	});
	}


	editRoles(user: any) {
		const roles = prompt('Enter roles (comma separated)', user.roles.join(','));
		if (!roles) return;

		this.userAdmin.updateRoles(user.id, roles.split(','))
			.subscribe(() => this.loadUsers());
	}

	changePassword(user: any) {
		const pwd = prompt('Enter new password');
		if (!pwd) return;

		this.userAdmin.updatePassword(user.id, pwd)
			.subscribe(() => alert('Password updated'));
	}
}
