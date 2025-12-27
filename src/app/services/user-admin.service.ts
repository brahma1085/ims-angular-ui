import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminUser } from '../models/admin-user.model';

@Injectable({ providedIn: 'root' })
export class UserAdminService {

  // use the `/api` prefix so the dev server proxy (proxy.conf.json)
  // routes API traffic to the backend without colliding with SPA routes
  private baseUrl = '/api/admin/users';

  constructor(private http: HttpClient) {}

  createUser(payload: { username: string; password: string; roles: string[] }) {
    return this.http.post(this.baseUrl, payload);
  }

  getUsers() {
    return this.http.get<AdminUser[]>(this.baseUrl);
  }

  updateRoles(userId: string, roles: string[]) {
    return this.http.put(`${this.baseUrl}/${userId}/roles`, { roles });
  }

  updatePassword(userId: string, password: string) {
    return this.http.put(`${this.baseUrl}/${userId}/password`, { password });
  }

  deleteUser(userId: string) {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }

}
