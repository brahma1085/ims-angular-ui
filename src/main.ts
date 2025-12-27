import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { KeycloakService } from './app/auth/keycloak.service';
import { authInterceptor } from './app/auth/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { register } from 'swiper/element/bundle';

register();

const keycloakService = new KeycloakService();

(async () => {
	try {
		// ✅ Keycloak is initialized BEFORE Angular bootstraps
		await keycloakService.init();

		await bootstrapApplication(AppComponent, {
			providers: [provideAnimations(),
			provideRouter(routes,
				withRouterConfig({
					onSameUrlNavigation: 'reload'
				})),

			// ✅ HttpClient initialized once token exists
			provideHttpClient(
				withInterceptors([authInterceptor])
			),

			// ✅ CRITICAL: single shared KeycloakService instance
			{ provide: KeycloakService, useValue: keycloakService }
			]
		});
	} catch (err) {
		console.error('Keycloak init failed', err);
	}
})();
