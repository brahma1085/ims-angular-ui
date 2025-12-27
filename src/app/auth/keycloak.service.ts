import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class KeycloakService {

  private keycloak: Keycloak;
  private initialized = false;

  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8095',
      realm: 'microservices-realm',
      clientId: 'angular-ui'
    });
  }

  async init(): Promise<void> {
    await this.keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
      pkceMethod: 'S256'
    });
    this.initialized = true;
  }

  login(): void {
    this.keycloak.login();
  }

  logout(): void {
    this.keycloak.logout({
      redirectUri: window.location.origin
    });
  }


  isLoggedIn(): boolean {
    return !!this.keycloak.token;
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  hasRole(role: string): boolean {
    return this.keycloak.hasRealmRole(role);
  }

  getUserRoles(): string[] {
    return this.keycloak.tokenParsed?.realm_access?.roles || [];
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  waitUntilInitialized(): Promise<void> {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (this.initialized) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });
  }
}
