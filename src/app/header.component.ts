import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { KeycloakService } from './auth/keycloak.service';
import { UsersDialogComponent } from './users/users-dialog.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	standalone: true,
	imports: [
		MatFormFieldModule,
		CommonModule,
		MatInputModule,
		MatSelectModule,   // ✅ REQUIRED for mat-option
		MatButtonModule, MatIconModule, MatToolbarModule, RouterLink
	]
})
export class HeaderComponent {

	constructor(
		private dialog: MatDialog,
		private kc: KeycloakService,
		private router: Router
	) { }

	//isAdmin = false;

	ngOnInit() {
		console.log('User roles:', this.kc.getUserRoles());
	}

	isAdmin(): boolean {
		return this.kc.hasRole('ADMIN');
	}

	openUsers() {
		this.router.navigateByUrl('/users');
	}


	go(path: string) {
		this.router.navigateByUrl(path);
	}

	logout() {
		this.kc.logout();
	}

}
