import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { KeycloakService } from './auth/keycloak.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CommonModule, MatButtonModule, MatToolbarModule, HeaderComponent],
	templateUrl: './app.component.html'
})
export class AppComponent {
	constructor(private router: Router, private kc: KeycloakService) { }

	go(path: string) {
		this.router.navigateByUrl(path);
	}

	logout() {
		this.kc.logout();
		window.location.href = window.location.origin;
	}

}
